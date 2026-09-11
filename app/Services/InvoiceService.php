<?php

namespace App\Services;

use App\Http\Controllers\PaymentController;
use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;
use Barryvdh\DomPDF\PDF as DomPdfInstance;

class InvoiceService
{
    /**
     * Generate a DomPDF instance for a given top-up transaction.
     *
     * @param  array<string, mixed>|null  $package
     */
    public function generate(Transaction $transaction, ?array $package = null): DomPdfInstance
    {
        $transaction->loadMissing('user');

        if (! $package) {
            $package = collect(PaymentController::PACKAGES)->firstWhere('coins', $transaction->amount);
        }

        $priceUsd = $package ? (float) $package['price_usd'] : round($transaction->amount * 0.01, 2);
        $invoiceNumber = sprintf(
            'INV-%s-%05d',
            $transaction->created_at ? $transaction->created_at->format('Y') : date('Y'),
            $transaction->id
        );

        $data = [
            'invoiceNumber' => $invoiceNumber,
            'date' => $transaction->created_at ? $transaction->created_at->format('M d, Y') : date('M d, Y'),
            'company' => config('company'),
            'user' => $transaction->user,
            'transaction' => $transaction,
            'package' => $package,
            'priceUsd' => $priceUsd,
            'coins' => $transaction->amount,
            'reference' => $transaction->payment_gateway_reference ?? ('PG-CHESS-'.$transaction->id),
        ];

        return Pdf::loadView('invoices.pdf', $data)
            ->setPaper('a4', 'portrait');
    }

    /**
     * Generate raw PDF binary string for mail attachment.
     *
     * @param  array<string, mixed>|null  $package
     */
    public function generatePdfOutput(Transaction $transaction, ?array $package = null): string
    {
        return $this->generate($transaction, $package)->output();
    }
}
