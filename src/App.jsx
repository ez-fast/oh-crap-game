import React from 'react';

export default function OhCrapGame() {
  const soundEffects = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    disaster: 'https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3',
    success: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3'
  };

  const playSound = (type) => {
    const audio = new Audio(soundEffects[type]);
    audio.volume = 0.35;
    audio.play().catch(() => {});
  };

  const randomEvents = [
    "A neighbor gives unsolicited plumbing advice.",
    "Your spouse is now supervising you.",
    "The water pressure suddenly changes.",
    "You hear dripping... but can't find it.",
    "The house smells worse than before.",
    "A YouTube plumber contradicts your plan."
  ];

  const storyNodes = {
    start: {
      title: 'OH CRAP!',
      text: `
It’s 9:14 PM.

You flush the upstairs toilet.

Nothing happens.

The water rises ominously.

Your kids are yelling downstairs.

The dog is barking at the bathroom door.
      `,
      choices: [
        {
          text: 'Call EZ-FAST Plumbing',
          next: 'goodEnding',
          damage: -5,
          stress: -10,
          wallet: -250
        },
        {
          text: 'Try to fix it yourself',
          next: 'plungerAttempt',
          damage: 10,
          stress: 15,
          wallet: 0
        }
      ]
    },

    kitchenStart: {
      title: 'OH CRAP! — Garbage Disposal Disaster',
      text: `
You hear a loud metallic crunch from the kitchen sink.

The garbage disposal begins humming ominously.

Water backs up into the sink.
      `,
      choices: [
        {
          text: 'Call EZ-FAST Plumbing',
          next: 'goodEnding',
          damage: -5,
          stress: -10,
          wallet: -250
        },
        {
          text: 'Stick your hand inside',
          next: 'disposalDisaster',
          damage: 20,
          stress: 25,
          wallet: -40
        }
      ]
    },

    plungerAttempt: {
      title: 'The Plunger Incident',
      text: `
The toilet erupts like a geyser.

You hear bubbling from the shower drain.
      `,
      choices: [
        {
          text: 'Call EZ-FAST Plumbing',
          next: 'rescuedEnding',
          damage: -5,
          stress: -10,
          wallet: -350
        },
        {
          text: 'Rent a drain snake',
          next: 'snakeDisaster',
          damage: 25,
          stress: 20,
          wallet: -89
        }
      ]
    },

    snakeDisaster: {
      title: 'Critical Error',
      text: `
The snake gets stuck.

Something cracks in the wall.
      `,
      choices: [
        {
          text: 'Call EZ-FAST Plumbing',
          next: 'lateRescueEnding',
          damage: 10,
          stress: 10,
          wallet: -650
        },
        {
          text: 'Keep pushing anyway',
          next: 'catastropheEnding',
          damage: 50,
          stress: 40,
          wallet: -1200
        }
      ]
    },

    disposalDisaster: {
      title: 'The Disposal Revolts',
      text: `
Black sludge erupts upward.

The sink leaks into the cabinet.
      `,
      choices: [
        {
          text: 'Call EZ-FAST Plumbing',
          next: 'rescuedEnding',
          damage: 5,
          stress: 5,
          wallet: -300
        },
        {
          text: 'Watch more DIY videos',
          next: 'catastropheEnding',
          damage: 40,
          stress: 30,
          wallet: -900
        }
      ]
    },

    multiDrainDisaster: {
      title: 'Cross-Contamination Event',
      text: `
Multiple drains begin backing up at once.

The house is now confused.
      `,
      choices: [
        {
          text: 'Call EZ-FAST Plumbing',
          next: 'lateRescueEnding',
          damage: 10,
          stress: 10,
          wallet: -600
        },
        {
          text: 'Open the main line',
          next: 'mainLineExplosion',
          damage: 40,
          stress: 35,
          wallet: -120
        }
      ]
    },

    mainLineExplosion: {
      title: 'MAIN LINE FAILURE',
      text: `
Everything floods.

Everything.
      `,
      choices: [
        {
          text: 'Call EZ-FAST Plumbing',
          next: 'catastropheEnding',
          damage: 15,
          stress: 15,
          wallet: -900
        },
        {
          text: 'Accept defeat',
          next: 'catastropheEnding',
          damage: 50,
          stress: 50,
          wallet: -2000
        }
      ]
    },

    goodEnding: {
      ending: true,
      title: 'Professional Victory',
      text: `Everything is fixed quickly.`
    },

    rescuedEnding: {
      ending: true,
      title: 'Narrow Escape',
      text: `You avoided disaster.`
    },

    lateRescueEnding: {
      ending: true,
      title: 'Expensive Lesson',
      text: `Repairs were costly but successful.`
    },

    catastropheEnding: {
      ending: true,
      title: 'TOTAL PLUMBING CATASTROPHE',
      text: `Everything went wrong.`
    }
  };

  const [currentNode, setCurrentNode] = React.useState('start');
  const [damage, setDamage] = React.useState(0);
  const [stress, setStress] = React.useState(0);
  const [wallet, setWallet] = React.useState(0);
  const [floodLevel, setFloodLevel] = React.useState(0);
  const [achievement, setAchievement] = React.useState('');
  const [shake, setShake] = React.useState(false);
  const [event, setEvent] = React.useState('');

  const node = storyNodes[currentNode];

  const handleChoice = (choice) => {
    playSound('click');

    if (Math.random() < 0.35) {
      setEvent(randomEvents[Math.floor(Math.random() * randomEvents.length)]);
    } else {
      setEvent('');
    }

    if (choice.damage >= 25) {
      setShake(true);
      playSound('disaster');
      setTimeout(() => setShake(false), 500);
    }

    if (choice.next.includes('Ending') && choice.damage < 15) {
      playSound('success');
    }

    setDamage((p) => Math.max(0, p + choice.damage));
    setStress((p) => Math.max(0, p + choice.stress));
    setWallet((p) => p + choice.wallet);
    setFloodLevel((p) => Math.min(100, p + choice.damage));

    if (choice.next === 'catastropheEnding') {
      setAchievement('MASTER OF BAD DECISIONS');
    }

    if (choice.next === 'goodEnding') {
      setAchievement('RESPONSIBLE HOMEOWNER');
    }

    setCurrentNode(choice.next);
  };

  const restartGame = () => {
    setCurrentNode('start');
    setDamage(0);
    setStress(0);
    setWallet(0);
    setFloodLevel(0);
    setAchievement('');
    setEvent('');
  };

  const meterClass = (value) => {
    if (value < 25) return 'bg-green-500';
    if (value < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <>
      <div
        className="fixed bottom-0 left-0 w-full bg-blue-500/40 pointer-events-none transition-all duration-700 z-0"
        style={{ height: `${floodLevel}%` }}
      ></div>

      <div className={`min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-6 flex items-center justify-center ${shake ? "animate-pulse" : ""}`}>

        <div className="w-full max-w-4xl bg-slate-900 rounded-3xl p-8 border border-slate-700">

          <h1 className="text-5xl font-bold text-red-400 text-center mb-4">
            {node.title}
          </h1>

          {event && (
            <div className="bg-yellow-500/10 border border-yellow-400 text-yellow-200 p-3 rounded-xl mb-4 text-sm">
              ⚠ {event}
            </div>
          )}

          <p className="whitespace-pre-line mb-6">
            {node.text}
          </p>

          {!node.ending ? (
            <div className="space-y-3">
              {node.choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(c)}
                  className="w-full p-4 bg-slate-800 rounded-xl hover:bg-slate-700"
                >
                  {c.text}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={restartGame}
              className="w-full p-4 bg-red-600 rounded-xl"
            >
              Play Again
            </button>
          )}

        </div>
      </div>
    </>
  );
}