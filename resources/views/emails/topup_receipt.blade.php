<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Receipt — ChessSkins</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6; -webkit-font-smoothing: antialiased;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #030712; padding: 40px 16px;">
        <tr>
            <td align="center">
                <!-- Email Container -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5);">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 36px 32px 24px 32px; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-bottom: 1px solid #1e293b;">
                            <div style="font-size: 24px; font-weight: 900; letter-spacing: 0.15em; color: #ffffff; text-transform: uppercase;">
                                CHESS<span style="color: #f59e0b;">SKINS</span>
                            </div>
                            <div style="font-size: 11px; color: #94a3b8; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 6px;">
                                Official Payment Receipt & Order Confirmation
                            </div>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 36px 32px 28px 32px;">
                            <div style="display: inline-block; padding: 4px 12px; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 20px; font-size: 11px; font-weight: 700; color: #34d399; text-transform: uppercase; margin-bottom: 16px;">
                                ✓ Payment Completed
                            </div>

                            <h1 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 10px 0;">
                                Thank you for your purchase, {{ $user->name }}!
                            </h1>
                            <p style="font-size: 14px; line-height: 24px; color: #cbd5e1; margin: 0 0 24px 0;">
                                Your payment has been successfully processed and the coins have been immediately credited to your account.
                            </p>

                            <!-- Receipt Box -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #161e31; border: 1px solid #1e293b; border-radius: 14px; margin-bottom: 28px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 16px 20px; border-bottom: 1px solid #1e293b; font-size: 12px; color: #94a3b8;">
                                        Transaction Reference
                                    </td>
                                    <td align="right" style="padding: 16px 20px; border-bottom: 1px solid #1e293b; font-size: 13px; font-family: monospace; font-weight: 700; color: #f8fafc;">
                                        {{ $reference }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 12px; color: #94a3b8;">
                                        Coin Package
                                    </td>
                                    <td align="right" style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 13px; font-weight: 600; color: #f8fafc;">
                                        {{ $package['badge'] ?? 'Standard Pack' }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 12px; color: #94a3b8;">
                                        Coins Credited
                                    </td>
                                    <td align="right" style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 14px; font-weight: 800; color: #fbbf24;">
                                        +{{ number_format($package['coins']) }} Coins
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 12px; color: #94a3b8;">
                                        Amount Paid
                                    </td>
                                    <td align="right" style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 16px; font-weight: 900; color: #34d399;">
                                        ${{ number_format($package['price_usd'], 2) }} USD
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 20px; font-size: 12px; color: #94a3b8;">
                                        Updated Wallet Balance
                                    </td>
                                    <td align="right" style="padding: 14px 20px; font-size: 14px; font-weight: 700; color: #ffffff;">
                                        {{ number_format($user->wallet_balance) }} Coins
                                    </td>
                                </tr>
                            </table>

                            <!-- Action Buttons -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <a href="{{ $shopUrl }}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #0f172a; text-decoration: none; font-size: 14px; font-weight: 800; border-radius: 12px; box-shadow: 0 10px 20px -5px rgba(245, 158, 11, 0.4); text-transform: uppercase; letter-spacing: 0.05em;">
                                            Equip Pieces & Board Themes
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top: 14px;">
                                        <a href="{{ $profileUrl }}" style="font-size: 12px; color: #94a3b8; text-decoration: underline;">
                                            View billing history in your Profile
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer with Company info from .env -->
                    <tr>
                        <td style="padding: 24px 32px; background-color: #070b14; border-top: 1px solid #1e293b; font-size: 11px; line-height: 18px; color: #64748b; text-align: center;">
                            <div style="font-weight: 700; color: #94a3b8; margin-bottom: 4px;">
                                {{ $company['name'] }}
                            </div>
                            <div>
                                Company Reg. No: {{ $company['number'] }}
                            </div>
                            <div style="margin-top: 2px;">
                                Registered Address: {{ $company['addr'] }}
                            </div>
                            <div style="margin-top: 6px;">
                                Official Billing Support: <a href="mailto:{{ $company['email'] }}" style="color: #f59e0b; text-decoration: none;">{{ $company['email'] }}</a>
                            </div>
                            <div style="margin-top: 12px; font-size: 10px; color: #475569;">
                                © {{ date('Y') }} {{ $company['name'] }}. All rights reserved.
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
