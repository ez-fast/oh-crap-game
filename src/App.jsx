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

  const storyNodes = {
    kitchenStart: {
      title: 'OH CRAP! — Garbage Disposal Disaster',
      text: `
You hear a loud metallic crunch from the kitchen sink.

The garbage disposal begins humming ominously.

Water slowly backs up into the sink.

Your spouse asks:

"Did you put potato peels down there again?"

You pretend not to hear the question.
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
          text: 'Stick your hand into the disposal area',
          next: 'disposalDisaster',
          damage: 20,
          stress: 25,
          wallet: -40
        }
      ]
    },

    disposalDisaster: {
      title: 'The Disposal Revolts',
      text: `
You attempt an aggressive DIY repair.

Unfortunately...

The disposal suddenly frees itself.

Black sludge erupts upward like a geyser.

Something that might once have been spinach lands on the ceiling.

The sink now leaks directly into the cabinet below.
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
          text: 'Watch another DIY video',
          next: 'catastropheEnding',
          damage: 40,
          stress: 30,
          wallet: -900
        }
      ]
    },

    start: {
      title: 'OH CRAP!',
      text: `
It’s 9:14 PM.

You flush the upstairs toilet.

Nothing happens.

The water rises ominously.

Your kids are yelling downstairs.

The dog is barking at the bathroom door.

What do you do?
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

    plungerAttempt: {
      title: 'The Plunger Incident',
      text: `
You find a dusty plunger under the kitchen sink.

After several aggressive plunges...

The toilet erupts like a geyser.

You now hear bubbling noises from the shower drain.

The bathroom smells concerning.
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
          text: 'Rent a drain snake from the hardware store',
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
You rent the cheapest drain snake available.

Halfway through the process...

The snake becomes permanently lodged in the pipe.

You panic and pull harder.

Something cracks inside the wall.

Water begins dripping through the kitchen ceiling.
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
          text: 'Watch more YouTube tutorials',
          next: 'catastropheEnding',
          damage: 50,
          stress: 40,
          wallet: -1200
        }
      ]
    },

    goodEnding: {
      ending: true,
      title: 'Professional Victory',
      text: `
An EZ-FAST technician arrives the next morning.

The blockage is cleared in under 20 minutes.

The plumber explains the issue, checks for additional problems, and leaves the bathroom cleaner than before.

Total damage: $0

Marriage status: Stable

Stress level: Minimal
      `
    },

    rescuedEnding: {
      ending: true,
      title: 'Narrow Escape',
      text: `
EZ-FAST arrives just before the situation becomes catastrophic.

The technician clears the main line, sanitizes the affected area, and explains what caused the backup.

You are informed that continuing DIY attempts likely would have flooded the downstairs bathroom.

You quietly throw away the plunger.
      `
    },

    lateRescueEnding: {
      ending: true,
      title: 'Expensive Lesson',
      text: `
EZ-FAST restores order after a surprisingly emotional evening.

Repairs are successful.

Unfortunately:

- ceiling drywall must be replaced
- the vanity cabinet absorbed water
- your spouse now supervises all future home repairs

Still... it could have been worse.
      `
    },

    catastropheEnding: {
      ending: true,
      title: 'TOTAL PLUMBING CATASTROPHE',
      text: `
At 2:17 AM the upstairs toilet fully overflows.

Water pours through the ceiling fan.

The dog refuses to enter the house.

Your insurance company places you on hold for 46 minutes.

You eventually call EZ-FAST anyway.

The technician politely avoids saying “I told you so.”
      `
    }
  };

  const [currentNode, setCurrentNode] = React.useState('start');
  const [damage, setDamage] = React.useState(0);
  const [stress, setStress] = React.useState(0);
  const [wallet, setWallet] = React.useState(0);
  const [floodLevel, setFloodLevel] = React.useState(0);
  const [achievement, setAchievement] = React.useState('');

  const node = storyNodes[currentNode];

  const handleChoice = (choice) => {
    playSound('click');

    if (choice.damage >= 25) {
      playSound('disaster');
    }

    if (choice.next.includes('Ending') && choice.damage < 15) {
      playSound('success');
    }
    setDamage((prev) => Math.max(0, prev + choice.damage));
    setStress((prev) => Math.max(0, prev + choice.stress));
    setWallet((prev) => prev + choice.wallet);

    setFloodLevel((prev) => Math.min(100, prev + choice.damage));

    if (choice.next === 'catastropheEnding') {
      setAchievement('MASTER OF BAD DECISIONS');
    }

    if (choice.next === 'goodEnding') {
      setAchievement('RESPONSIBLE HOMEOWNER');
    }

    setCurrentNode(choice.next);
  };

  const randomStart = () => {
    const starts = ['start', 'kitchenStart'];
    return starts[Math.floor(Math.random() * starts.length)];
  };

  const restartGame = () => {
    setCurrentNode(randomStart());
    setCurrentNode('start');
    setDamage(0);
    setStress(0);
    setWallet(0);
    setFloodLevel(0);
    setAchievement('');
  };

  const meterClass = (value) => {
    if (value < 25) return 'bg-green-500';
    if (value < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <>
      <div
        className="fixed bottom-0 left-0 w-full bg-blue-500/30 pointer-events-none transition-all duration-1000 z-0"
        style={{ height: `${floodLevel}%` }}
      ></div>
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-6 flex items-center justify-center animate-pulse">
      <div className="w-full max-w-4xl grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-700 transition-all duration-500 hover:scale-[1.01]">

          <div className="mb-6">
            <h1 className="text-5xl font-black tracking-tight text-center mb-2 text-red-400 drop-shadow-lg animate-bounce">
              {node.title}
            </h1>

            <div className="h-1 w-32 bg-red-500 mx-auto rounded-full"></div>
          </div>

          <div className="whitespace-pre-line text-lg leading-8 text-slate-200 mb-10">
            {node.text}
          </div>

          {!node.ending ? (
            <div className="grid gap-4">
              {node.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  className="w-full p-5 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-all duration-200 border border-slate-600 text-left text-lg font-semibold"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <button
                onClick={restartGame}
                className="w-full p-5 rounded-2xl bg-red-600 hover:bg-red-500 transition-all duration-200 text-lg font-bold"
              >
                Play Again
              </button>

              <a
                href="https://ez-fast.com"
                target="_blank"
                className="w-full p-5 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all duration-200 text-lg font-bold text-center"
              >
                Contact EZ-FAST Plumbing
              </a>
            </div>
          )}
        </div>

        <div className="bg-slate-900 rounded-3xl shadow-2xl p-6 border border-slate-700 flex flex-col gap-8">

          <div>
            <h2 className="text-xl font-bold mb-3">Home Damage</h2>
            <div className="w-full bg-slate-700 rounded-full h-5 overflow-hidden">
              <div
                className={`h-full ${meterClass(damage)} transition-all duration-500`}
                style={{ width: `${Math.min(damage, 100)}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-slate-300">{damage}% catastrophic</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Stress Level</h2>
            <div className="w-full bg-slate-700 rounded-full h-5 overflow-hidden">
              <div
                className={`h-full ${meterClass(stress)} transition-all duration-500`}
                style={{ width: `${Math.min(stress, 100)}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-slate-300">{stress}% emotional collapse</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Financial Damage</h2>
            <div className="text-4xl font-black text-red-400">
              ${Math.abs(wallet).toLocaleString()}
            </div>
            <p className="text-sm text-slate-300 mt-2">
              Money lost to questionable decisions.
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-600 animate-pulse">
            <h3 className="text-lg font-bold mb-2 text-red-400">
              EZ-FAST Tip
            </h3>

            <p className="text-slate-300 leading-7 text-sm">
              Most major plumbing emergencies start as small issues that escalate after repeated DIY attempts.
            </p>
          </div>
        </div>
                {achievement && (
            <div className="mt-6 bg-yellow-500/20 border border-yellow-400 rounded-2xl p-4 text-center">
              <h3 className="text-yellow-300 font-black text-xl mb-2">
                Achievement Unlocked
              </h3>

              <p className="text-lg font-bold">
                {achievement}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
