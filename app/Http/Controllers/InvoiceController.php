<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\InvoiceService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InvoiceController extends Controller
{
    /**
     * Download an official PDF invoice for a completed top-up transaction.
     */
    public function download(Request $request, Transaction $transaction, InvoiceService $invoiceService): Response
    {
        $user = $request->user();

        if ($transaction->user_id !== $user->id) {
            abort(403, 'You are not authorized to view or download this invoice.');
        }

        if ($transaction->type !== 'topup') {
            abort(400, 'Invoices are only available for coin top-up transactions.');
        }

        $pdf = $invoiceService->generate($transaction);

        $filename = sprintf('invoice_%s.pdf', $transaction->payment_gateway_reference ?? ('TX-'.$transaction->id));

        return $pdf->download($filename);
    }
}
