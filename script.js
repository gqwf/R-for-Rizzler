class WizardOrpheus {
  constructor(
    description = "You are a prison guard in the 1920s he Rizzler was caught orchestrating an underground speakeasy riddled with moonshine and swing music that lured every high-roller and jazz aficionado in the city. But that ain't the half of it—rumor has it they charmed their way into smuggling secrets between rival mob families under the guise of smooth-talking entertainment.you're the new warden, faced with this silver-tongued devil in the slammer. Their rizz is legendary, and they’ve been known to sweet-talk even the grumpiest of guards into bending the rules. Can you withstand their charm and keep 'em locked up, or will you risk becoming a part of their next big score? "
  ) {
    this.description = description;
    this.variables = {
      score: 0,
      suspicionLevel: 0,
      rizzLevel: 0,
      memory: [],
    };
    this.guardMood = this.randomMood();
  }

  randomMood() {
    const moods = ["grumpy", "curious", "strict", "lazy", "humorous"];
    return moods[Math.floor(Math.random() * moods.length)];
  }

  message(userInput) {
    let response = this.generateResponse(userInput);
    document.getElementById(
      "conversation"
    ).innerHTML += `<p><strong>Guard:</strong> ${response}</p>`;
    this.updateUI();
  }

  generateResponse(userInput) {
    this.variables.memory.push(userInput);
    let response = "";

    if (userInput.includes("escape") || userInput.includes("break out")) {
      this.variables.rizzLevel += 10;
      this.variables.suspicionLevel += 5;

      if (this.variables.rizzLevel > 25) {
        response =
          "**Guard whispers**: Alright, kid... you've convinced me. But if we do this, it’s gotta be a perfect heist.";
      } else {
        response =
          "**Guard squints**: Trying to pull a fast one, eh? Not on my watch.";
      }
    } else if (userInput.includes("charm") || userInput.includes("convince")) {
      this.variables.rizzLevel += 5;
      response =
        this.guardMood === "grumpy"
          ? "**Guard scoffs**: You think that fancy talk works on me?"
          : "**Guard smirks**: You got a silver tongue, kid, but it ain’t enough yet.";
    } else {
      this.variables.suspicionLevel += 2;
      response =
        this.guardMood === "lazy"
          ? "**Guard yawns**: I ain’t got time for this, just stay in your cell."
          : "**Guard frowns**: I dunno, kid... you’re startin’ to sound a little suspicious...";
    }

    // Guard referencing past conversations (memory system)
    if (this.variables.memory.length > 3 && Math.random() > 0.6) {
      response += `\n**Guard recalls**: Didn't you say "${
        this.variables.memory[
          Math.floor(Math.random() * this.variables.memory.length)
        ]
      }" earlier? You tryna play me?`;
    }

    return response;
  }

  updateUI() {
    document.getElementById("rizzLevel").textContent = this.variables.rizzLevel;
    document.getElementById("suspicionLevel").textContent =
      this.variables.suspicionLevel;
    document.body.style.backgroundColor = `rgba(25, 25, 25, ${
      this.variables.suspicionLevel / 25
    })`;
  }
}

// Initialize the game
var myGame = new WizardOrpheus();

document.getElementById("input").addEventListener("keyup", function (e) {
  if (e.code == "Enter") {
    let userInput = document.getElementById("input").value;
    document.getElementById(
      "conversation"
    ).innerHTML += `<p><strong>The Rizzler:</strong> ${userInput}</p>`;
    myGame.message(userInput);

    document.getElementById("input").value = "";
  }
});
