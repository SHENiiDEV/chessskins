<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <meta name="theme-color" content="#0A0C10">

        <title inertia>{{ config('app.name', 'ChessSkins') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-slate-950 text-slate-100 min-h-screen selection:bg-amber-500 selection:text-slate-950">
        @inertia
    </body>
</html>
