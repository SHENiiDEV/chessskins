<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Invoice {{ $invoiceNumber }}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1e293b;
            font-size: 13px;
            line-height: 1.5;
            margin: 0;
            padding: 20px 30px;
        }

        .header-table {
            width: 100%;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 20px;
            margin-bottom: 25px;
        }

        .brand-title {
            font-size: 24px;
            font-weight: 900;
            letter-spacing: 2px;
            color: #0f172a;
            text-transform: uppercase;
        }

        .brand-accent {
            color: #d97706;
        }

        .brand-subtitle {
            font-size: 10px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 4px;
        }

        .invoice-badge-cell {
            text-align: right;
            vertical-align: top;
        }

        .invoice-title {
            font-size: 26px;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            letter-spacing: 1px;
        }

        .invoice-meta {
            font-size: 11px;
            color: #475569;
            margin-top: 5px;
        }

        .paid-stamp {
            display: inline-block;
            background-color: #ecfdf5;
            color: #059669;
            border: 1.5px solid #10b981;
            padding: 4px 12px;
            border-radius: 6px;
            font-weight: 800;
            font-size: 12px;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-top: 8px;
        }

        .addresses-table {
            width: 100%;
            margin-bottom: 30px;
        }

        .address-box {
            width: 48%;
            vertical-align: top;
        }

        .address-box-right {
            width: 48%;
            vertical-align: top;
            text-align: right;
        }

        .section-label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #94a3b8;
            margin-bottom: 6px;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 4px;
        }

        .entity-name {
            font-size: 14px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 4px;
        }

        .entity-details {
            font-size: 11px;
            color: #475569;
            line-height: 1.6;
        }

        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }

        .items-table th {
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
            border-bottom: 2px solid #cbd5e1;
            color: #334155;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 10px 12px;
            text-align: left;
        }

        .items-table td {
            padding: 12px;
            border-bottom: 1px solid #f1f5f9;
            font-size: 12px;
            color: #1e293b;
        }

        .text-right {
            text-align: right;
        }

        .text-center {
            text-align: center;
        }

        .totals-table {
            width: 45%;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 30px;
        }

        .totals-table td {
            padding: 6px 12px;
            font-size: 12px;
        }

        .totals-label {
            color: #64748b;
            text-align: right;
        }

        .totals-val {
            color: #0f172a;
            text-align: right;
            font-weight: 600;
        }

        .total-row td {
            border-top: 2px solid #e2e8f0;
            padding-top: 10px;
            font-size: 15px;
            font-weight: 800;
            color: #0f172a;
        }

        .payment-info-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 14px 18px;
            margin-bottom: 30px;
        }

        .payment-info-title {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #334155;
            margin-bottom: 6px;
        }

        .payment-info-content {
            font-size: 11px;
            color: #475569;
            line-height: 1.6;
        }

        .footer-note {
            margin-top: 40px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 10px;
            color: #94a3b8;
            line-height: 1.5;
        }
    </style>
</head>
<body>

    <!-- Header -->
    <table class="header-table" cellpadding="0" cellspacing="0">
        <tr>
            <td style="vertical-align: top;">
                <div class="brand-title">CHESS<span class="brand-accent">SKINS</span></div>
                <div class="brand-subtitle">Interactive Web Chess Platform</div>
            </td>
            <td class="invoice-badge-cell">
                <div class="invoice-title">TAX INVOICE</div>
                <div class="invoice-meta">
                    <strong>Invoice #:</strong> {{ $invoiceNumber }}<br>
                    <strong>Date:</strong> {{ $date }}
                </div>
                <div>
                    <span class="paid-stamp">✓ PAID IN FULL</span>
                </div>
            </td>
        </tr>
    </table>

    <!-- Addresses: Seller & Buyer -->
    <table class="addresses-table" cellpadding="0" cellspacing="0">
        <tr>
            <!-- Seller -->
            <td class="address-box">
                <div class="section-label">Issued By (Seller)</div>
                <div class="entity-name">{{ $company['name'] }}</div>
                <div class="entity-details">
                    Company Reg. No: {{ $company['number'] }}<br>
                    {{ $company['addr'] }}<br>
                    Email: {{ $company['email'] }}
                </div>
            </td>
            <!-- Buyer -->
            <td style="width: 4%;"></td>
            <td class="address-box-right">
                <div class="section-label">Billed To (Customer)</div>
                <div class="entity-name">{{ $user->name }} {{ $user->surname }}</div>
                <div class="entity-details">
                    @if($user->address_line_1)
                        {{ $user->address_line_1 }}<br>
                    @endif
                    @if($user->city || $user->post_code)
                        {{ $user->city }}{{ $user->city && $user->post_code ? ', ' : '' }}{{ $user->post_code }}<br>
                    @endif
                    @if($user->country)
                        {{ $user->country }}<br>
                    @endif
                    Email: {{ $user->email }}
                </div>
            </td>
        </tr>
    </table>

    <!-- Items Table -->
    <table class="items-table" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th style="width: 50%;">Description</th>
                <th class="text-center" style="width: 15%;">Type</th>
                <th class="text-center" style="width: 15%;">Coins Amount</th>
                <th class="text-right" style="width: 20%;">Total (USD)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong>{{ $package['badge'] ?? 'Chess Coins Package' }}</strong>
                    <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                        In-game virtual currency used for unlocking cosmetic chess piece skins and board visual themes.
                    </div>
                </td>
                <td class="text-center" style="color: #64748b;">Digital Goods</td>
                <td class="text-center" style="font-weight: 700; color: #d97706;">+{{ number_format($coins) }}</td>
                <td class="text-right" style="font-weight: 700;">${{ number_format($priceUsd, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <!-- Totals Table -->
    <table class="totals-table" cellpadding="0" cellspacing="0">
        <tr>
            <td class="totals-label">Subtotal:</td>
            <td class="totals-val">${{ number_format($priceUsd, 2) }}</td>
        </tr>
        <tr>
            <td class="totals-label">VAT / Sales Tax (0%):</td>
            <td class="totals-val">$0.00</td>
        </tr>
        <tr class="total-row">
            <td class="totals-label" style="color: #0f172a;">Total Paid:</td>
            <td class="totals-val" style="color: #059669;">${{ number_format($priceUsd, 2) }} USD</td>
        </tr>
    </table>

    <!-- Payment Transaction Details -->
    <div class="payment-info-box">
        <div class="payment-info-title">Payment Settlement Details</div>
        <div class="payment-info-content">
            <strong>Payment Method:</strong> Credit/Debit Card (Online Payment)<br>
            <strong>Payment Gateway Reference:</strong> <span style="font-family: monospace;">{{ $reference }}</span><br>
            <strong>Payment Status:</strong> Completed & Verified<br>
            <strong>Settlement Currency:</strong> USD ($)
        </div>
    </div>

    <!-- Footer Note -->
    <div class="footer-note">
        Thank you for your purchase. This document serves as your official electronic tax invoice and proof of purchase.<br>
        {{ $company['name'] }} • Registered in {{ $company['addr'] }} • Support: {{ $company['email'] }}
    </div>

</body>
</html>
