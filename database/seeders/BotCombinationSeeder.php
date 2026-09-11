<?php

namespace Database\Seeders;

use App\Models\BotCombination;
use Illuminate\Database\Seeder;

class BotCombinationSeeder extends Seeder
{
    public function run(): void
    {
        $combinations = [
            [
                'name' => 'Italian Game (Giuoco Piano)',
                'category' => 'Open Games',
                'description' => 'One of the oldest and most respected chess openings. Teaches harmonious minor piece development and the fight for d4.',
                'moves_sequence' => ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd4', 'exd4'],
                'bot_responses' => [
                    'e4' => [
                        'move' => 'e5',
                        'comment' => 'Black responds symmetrically, controlling central squares d4 and f4 while opening diagonals for queen and bishop.',
                        'is_final' => false,
                    ],
                    'e4 e5 Nf3' => [
                        'move' => 'Nc6',
                        'comment' => 'Black develops the knight to defend the e5 pawn and maintain central equilibrium.',
                        'is_final' => false,
                    ],
                    'e4 e5 Nf3 Nc6 Bc4' => [
                        'move' => 'Bc5',
                        'comment' => 'Italian Game (Giuoco Piano). Black develops the bishop actively targeting the vulnerable a7-g1 diagonal.',
                        'is_final' => false,
                    ],
                    'e4 e5 Nf3 Nc6 Bc4 Bc5 c3' => [
                        'move' => 'Nf6',
                        'comment' => 'Counter-attack! Black attacks the undefended e4 pawn while preparing kingside castling.',
                        'is_final' => false,
                    ],
                    'e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4' => [
                        'move' => 'exd4',
                        'comment' => 'Black captures the central pawn. Mainline Italian Game theoretical sequence completed successfully!',
                        'is_final' => true,
                    ],
                ],
            ],
            [
                'name' => 'Sicilian Defense: Najdorf Variation',
                'category' => 'Semi-Open Games',
                'description' => 'The legendary aggressive weapon of Bobby Fischer and Garry Kasparov. Asymmetrical battle for the initiative.',
                'moves_sequence' => ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6'],
                'bot_responses' => [
                    'e4' => [
                        'move' => 'c5',
                        'comment' => 'The Sicilian Defense! Black fights for the center from the flank, preventing White from easily occupying d4.',
                        'is_final' => false,
                    ],
                    'e4 c5 Nf3' => [
                        'move' => 'd6',
                        'comment' => 'Black prepares Nf6 development without fear of an immediate e4-e5 advance.',
                        'is_final' => false,
                    ],
                    'e4 c5 Nf3 d6 d4' => [
                        'move' => 'cxd4',
                        'comment' => 'Trading the c-pawn for White\'s central d-pawn gives Black a strategic long-term central pawn majority.',
                        'is_final' => false,
                    ],
                    'e4 c5 Nf3 d6 d4 cxd4 Nxd4' => [
                        'move' => 'Nf6',
                        'comment' => 'Natural development with immediate tempo pressure against the undefended e4 pawn.',
                        'is_final' => false,
                    ],
                    'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3' => [
                        'move' => 'a6',
                        'comment' => 'The signature Najdorf move! Controls b5 to deny White\'s knight and bishop while preparing queenside expansion.',
                        'is_final' => true,
                    ],
                ],
            ],
            [
                'name' => 'Queen\'s Gambit Declined (QGD)',
                'category' => 'Closed Games',
                'description' => 'A rock-solid classical defense against 1. d4. Teaches pawn chain dynamics and patient positional maneuvering.',
                'moves_sequence' => ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O'],
                'bot_responses' => [
                    'd4' => [
                        'move' => 'd5',
                        'comment' => 'Solid d5 stakes an immediate claim in the center and controls the critical e4 square.',
                        'is_final' => false,
                    ],
                    'd4 d5 c4' => [
                        'move' => 'e6',
                        'comment' => 'Declined! The e6 pawn bolsters d5, creating an unyielding central pawn wedge.',
                        'is_final' => false,
                    ],
                    'd4 d5 c4 e6 Nc3' => [
                        'move' => 'Nf6',
                        'comment' => 'Kingside knight development providing additional reinforcement for d5.',
                        'is_final' => false,
                    ],
                    'd4 d5 c4 e6 Nc3 Nf6 Bg5' => [
                        'move' => 'Be7',
                        'comment' => 'Black breaks the pin on the f6 knight before castling kingside.',
                        'is_final' => false,
                    ],
                    'd4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3' => [
                        'move' => 'O-O',
                        'comment' => 'Kingside castled into complete safety! Black completes classical development.',
                        'is_final' => true,
                    ],
                ],
            ],
            [
                'name' => 'Scholar\'s Mate Refutation',
                'category' => 'Traps & Counterattacks',
                'description' => 'Learn how to punish early aggressive queen raids and seize the initiative with calm development.',
                'moves_sequence' => ['e4', 'e5', 'Qh5', 'Nc6', 'Bc4', 'g6', 'Qf3', 'Nf6'],
                'bot_responses' => [
                    'e4' => [
                        'move' => 'e5',
                        'comment' => 'Open game central response.',
                        'is_final' => false,
                    ],
                    'e4 e5 Qh5' => [
                        'move' => 'Nc6',
                        'comment' => 'White attacks early with the Queen! Black calmly defends the attacked e5 pawn with the knight.',
                        'is_final' => false,
                    ],
                    'e4 e5 Qh5 Nc6 Bc4' => [
                        'move' => 'g6',
                        'comment' => 'Threatening checkmate on f7! Black parries by playing g6, attacking the white Queen with tempo!',
                        'is_final' => false,
                    ],
                    'e4 e5 Qh5 Nc6 Bc4 g6 Qf3' => [
                        'move' => 'Nf6',
                        'comment' => 'White renews mate threats, but Nf6 blocks the diagonal and secures safety. White\'s plan has completely failed!',
                        'is_final' => true,
                    ],
                ],
            ],
        ];

        foreach ($combinations as $combo) {
            BotCombination::updateOrCreate(['name' => $combo['name']], $combo);
        }
    }
}
