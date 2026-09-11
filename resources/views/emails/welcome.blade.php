<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ChessSkins</title>
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
                                Deterministic Training & Cosmetic Chess Store
                            </div>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 36px 32px 28px 32px;">
                            <h1 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 16px 0;">
                                Welcome to the Arena, {{ $user->name }}! ♟️
                            </h1>
                            <p style="font-size: 14px; line-height: 24px; color: #cbd5e1; margin: 0 0 24px 0;">
                                Your account has been successfully created. We are thrilled to welcome you to the chess training platform designed to eliminate engine chaos with deterministic book variations and custom visual themes.
                            </p>

                            <!-- Welcome Bonus Card -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #1e1e2f; border: 1px solid #f59e0b40; border-radius: 14px; margin-bottom: 28px;">
                                <tr>
                                    <td style="padding: 20px; text-align: center;">
                                        <div style="font-size: 11px; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px;">
                                            Welcome Gift Credited
                                        </div>
                                        <div style="font-size: 32px; font-weight: 900; color: #ffffff; line-height: 1.1;">
                                            +200 <span style="font-size: 16px; color: #fbbf24;">Coins</span>
                                        </div>
                                        <p style="font-size: 12px; color: #94a3b8; margin: 8px 0 0 0;">
                                            Spend your welcome coins right away in our Store to unlock piece styles and board palettes!
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Features List -->
                            <h2 style="font-size: 14px; font-weight: 700; color: #f8fafc; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 14px 0;">
                                What you can do next:
                            </h2>
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 8px 0; font-size: 13px; color: #cbd5e1; line-height: 20px;">
                                        <strong style="color: #38bdf8;">• Deterministic Bot Training:</strong> Practice the Italian Game, Sicilian Najdorf, and Queen's Gambit Declined without unpredictable computer blunders.
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-size: 13px; color: #cbd5e1; line-height: 20px;">
                                        <strong style="color: #fbbf24;">• Handcrafted Vector Skins:</strong> Equip vibrant Neon, Steampunk, Obsidian, and Retro Arcade piece sets.
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-size: 13px; color: #34d399;">
                                        <strong style="color: #34d399;">• Signature Board Themes:</strong> Switch between luxury boards including Classic Staunton, Synthwave, and Obsidian Glass.
                                    </td>
                                </tr>
                            </table>

                            <!-- Call to Action Buttons -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <a href="{{ $playUrl }}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #0f172a; text-decoration: none; font-size: 14px; font-weight: 800; border-radius: 12px; box-shadow: 0 10px 20px -5px rgba(245, 158, 11, 0.4); text-transform: uppercase; letter-spacing: 0.05em;">
                                            Start Training on Board
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top: 14px;">
                                        <a href="{{ $shopUrl }}" style="font-size: 12px; color: #94a3b8; text-decoration: underline;">
                                            Or visit the Skin & Board Store
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
                                Support & Compliance: <a href="mailto:{{ $company['email'] }}" style="color: #f59e0b; text-decoration: none;">{{ $company['email'] }}</a>
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
