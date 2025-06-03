const MB_TOKEN_ADDRESS = "0x36D95e38F8692c249e8459898c7fadCE63A5593B";
const FLIP_GAME_CONTRACT_ADDRESS = "0x73165E4Ebc13bAAA620e9be6a37a3c4f88093cDb";
const FLIP_GAME_ABI = [
  {
    "inputs": [],
    "name": "claimFaucet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "FaucetClaimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "tokenUsed",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "win",
        "type": "bool"
      }
    ],
    "name": "GamePlayed",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "playWithMB",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "playWithMON",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawMB",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawMON",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "token",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdrawn",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  },
  {
    "inputs": [],
    "name": "FAUCET_AMOUNT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "FAUCET_COOLDOWN",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasPlayedBefore",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "lastClaimTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mbToken",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_MB_WAGER",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_MON_WAGER",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Minimal ERC20 ABI for MB token
const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let web3;
let accounts = [];
let flipGameContract;
let selectedToken = "MON";

window.addEventListener("load", async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    console.log("Web3 initialized:", web3.version);
    flipGameContract = new web3.eth.Contract(FLIP_GAME_ABI, FLIP_GAME_CONTRACT_ADDRESS);
    console.log("Contract initialized at:", FLIP_GAME_CONTRACT_ADDRESS);
    try {
      const networkId = await web3.eth.net.getId();
      console.log("Connected to network ID:", networkId);
    } catch (err) {
      console.error("Network check failed:", err);
    }
    updateWalletStatus();
    updateBalance();
    updateLeaderboard(); // Load leaderboard on start
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-theme");
      themeToggleBtn.textContent = "🌙 Dark Mode";
    }
  } else {
    alert("Please install MetaMask or another EVM wallet.");
  }
});

// DOM elements (unchanged)
const walletStatus = document.getElementById("walletStatus");
const tokenSelect = document.getElementById("tokenSelect");
const wagerInput = document.getElementById("wagerInput");
const flipButton = document.getElementById("flipButton");
const resultDiv = document.getElementById("result");
const streakDiv = document.getElementById("streak");
const shareWinDiv = document.getElementById("shareWin");
const shareBtn = document.getElementById("shareBtn");
const balanceDiv = document.getElementById("balance");
const leaderboardDiv = document.getElementById("leaderboard");
const hamburgerBtn = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const connectWalletBtn = document.getElementById("connectWalletBtn");
const claimFaucetBtn = document.getElementById("claimFaucetBtn");
const faucetStatus = document.getElementById("faucetStatus");
const music = document.getElementById("bgMusic");
const toggleMusicBtn = document.getElementById("toggleMusicBtn");
const startGameBtn = document.getElementById("startGameBtn");
const startOverlay = document.getElementById("startOverlay");
const themeToggleBtn = document.getElementById("themeToggleBtn");

hamburgerBtn.onclick = () => menu.classList.toggle("hidden");

connectWalletBtn.onclick = async () => {
  if (window.ethereum) {
    try {
      accounts = await ethereum.request({ method: "eth_requestAccounts" });
      updateWalletStatus();
      updateBalance();
      updateLeaderboard();
    } catch (error) {
      alert("Wallet connection failed: " + error.message);
    }
  } else {
    alert("Please install MetaMask or another EVM wallet.");
  }
};

tokenSelect.onchange = () => {
  selectedToken = tokenSelect.value;
  wagerInput.min = selectedToken === "MON" ? 0.2 : 1;
  updateBalance();
};

async function updateWalletStatus() {
  walletStatus.textContent = accounts.length
    ? `Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`
    : "Not connected";
}

async function updateBalance() {
  if (!accounts.length) return;
  try {
    let balance;
    if (selectedToken === "MON") {
      balance = await web3.eth.getBalance(accounts[0]);
      balance = web3.utils.fromWei(balance, "ether");
    } else {
      const mbToken = new web3.eth.Contract(ERC20_ABI, MB_TOKEN_ADDRESS);
      balance = await mbToken.methods.balanceOf(accounts[0]).call();
      balance = web3.utils.fromWei(balance, "ether");
    }
    balanceDiv.textContent = `${selectedToken} Balance: ${parseFloat(balance).toFixed(4)}`;
  } catch (error) {
    console.error("Balance update failed:", error);
    balanceDiv.textContent = `${selectedToken} Balance: Error`;
  }
}

flipButton.onclick = async () => {
  if (!accounts.length) {
    alert("Connect your wallet first.");
    return;
  }
  let wager = parseFloat(wagerInput.value);
  if (isNaN(wager)) {
    alert("Enter a valid wager amount.");
    return;
  }
  const minWager = selectedToken === "MON" ? 0.2 : 1;
  if (wager < minWager) {
    alert(`Minimum wager for ${selectedToken} is ${minWager}`);
    return;
  }
  const balanceText = balanceDiv.textContent.split(": ")[1];
  if (parseFloat(balanceText) < wager) {
    alert("Insufficient balance");
    return;
  }

  const coin = document.querySelector(".coin");
  coin.classList.add("flip");
  setTimeout(() => coin.classList.remove("flip"), 1000);

  resultDiv.textContent = "Waiting for transaction confirmation...";
  shareWinDiv.classList.add("hidden");
  try {
    const wagerInWei = web3.utils.toWei(wager.toString(), "ether");
    let tx;
    if (selectedToken === "MON") {
      const contractBalance = await web3.eth.getBalance(FLIP_GAME_CONTRACT_ADDRESS);
      if (web3.utils.fromWei(contractBalance, "ether") < wager * 2) {
        resultDiv.textContent = "Contract has insufficient MON for payout.";
        return;
      }
      tx = await flipGameContract.methods.playWithMON().send({
        from: accounts[0],
        value: wagerInWei,
        gas: 200000
      });
    } else {
      const mbTokenContract = new web3.eth.Contract(ERC20_ABI, MB_TOKEN_ADDRESS);
      await mbTokenContract.methods
        .approve(FLIP_GAME_CONTRACT_ADDRESS, wagerInWei)
        .send({ from: accounts[0], gas: 100000 });
      tx = await flipGameContract.methods
        .playWithMB(wagerInWei)
        .send({ from: accounts[0], gas: 200000 });
    }
    const gameEvent = tx.events.GamePlayed;
    const win = gameEvent.returnValues.win;
    resultDiv.textContent = win
      ? `Win! ${wager * 2} ${selectedToken} sent to your wallet.`
      : `Lose. ${wager} ${selectedToken} kept by contract.`;

    let streak = JSON.parse(localStorage.getItem(`streak_${accounts[0]}`)) || {
      wins: 0,
      losses: 0,
      current: 0,
      isWin: false
    };
    if (win) {
      streak.current = streak.isWin ? streak.current + 1 : 1;
      streak.wins++;
      streak.isWin = true;
      const cachedWins = JSON.parse(localStorage.getItem("leaderboard_wins")) || {};
      const player = accounts[0].slice(0, 6) + "...";
      cachedWins[player] = (cachedWins[player] || 0) + 1;
      localStorage.setItem("leaderboard_wins", JSON.stringify(cachedWins));
      console.log("Saved win to localStorage:", cachedWins);
    } else {
      streak.current = streak.isWin ? 1 : streak.current + 1;
      streak.losses++;
      streak.isWin = false;
    }
    localStorage.setItem(`streak_${accounts[0]}`, JSON.stringify(streak));
    streakDiv.textContent = `Streak: ${streak.current} ${streak.isWin ? "Wins" : "Losses"} | Total W: ${streak.wins}, L: ${streak.losses}`;

    if (win) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      shareWinDiv.classList.remove("hidden");
    } else {
      resultDiv.classList.add("lose-shake");
      setTimeout(() => resultDiv.classList.remove("lose-shake"), 500);
    }

    updateLeaderboard();
    updateBalance();
  } catch (err) {
    console.error("Transaction failed:", err);
    resultDiv.textContent = `Transaction failed: ${err.message}`;
  }
};

claimFaucetBtn.onclick = async () => {
  if (!accounts.length) {
    alert("Connect your wallet first.");
    return;
  }
  faucetStatus.textContent = "Claiming faucet...";
  try {
    await flipGameContract.methods.claimFaucet().send({ from: accounts[0], gas: 100000 });
    faucetStatus.textContent = "Faucet claimed! Check your MB balance.";
    updateBalance();
  } catch (err) {
    console.error("Faucet claim failed:", err);
    faucetStatus.textContent = "Faucet claim failed or cooldown not over.";
  }
};

toggleMusicBtn.onclick = () => {
  if (music.paused) {
    music.play().then(() => {
      toggleMusicBtn.textContent = "🔇 Mute Music";
    }).catch(error => {
      console.error("Audio playback failed:", error);
      resultDiv.textContent = "Failed to play audio. Check console.";
    });
  } else {
    music.pause();
    toggleMusicBtn.textContent = "🎶 Play Music";
  }
};

startGameBtn.onclick = () => {
  music.play().then(() => {
    startOverlay.style.display = "none";
    toggleMusicBtn.textContent = "🔇 Mute Music";
  }).catch(error => {
    console.error("Audio playback failed:", error);
    resultDiv.textContent = "Failed to play audio, but game started.";
    startOverlay.style.display = "none";
  });
};

themeToggleBtn.onclick = () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
  themeToggleBtn.textContent = document.body.classList.contains("light-theme") ? "🌙 Dark Mode" : "☀️ Light Mode";
};

async function updateLeaderboard() {
  let wins = {};
  try {
    const latestBlock = await web3.eth.getBlockNumber();
    console.log("Latest block:", latestBlock);
    const fromBlock = Math.max(0, latestBlock - 10000);
    const events = await flipGameContract.getPastEvents("GamePlayed", {
      fromBlock,
      toBlock: "latest"
    });
    console.log("Fetched events:", events.length);
    events.forEach(e => {
      const player = e.returnValues.player.slice(0, 6) + "...";
      if (e.returnValues.win) {
        wins[player] = (wins[player] || 0) + 1;
      }
    });
  } catch (error) {
    console.error("Leaderboard fetch failed:", error);
  }
  // Always load cached wins
  const cachedWins = JSON.parse(localStorage.getItem("leaderboard_wins")) || {};
  console.log("Cached wins:", cachedWins);
  Object.assign(wins, cachedWins);
  const leaderboard = Object.entries(wins)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([player, count], i) => `${i + 1}. ${player}: ${count} Wins`)
    .join("<br>");
  leaderboardDiv.innerHTML = `<h3>Top Players</h3>${leaderboard || "No wins yet. Flip to win!"}`;
}

shareBtn.onclick = () => {
  const text = `I just won ${parseFloat(wagerInput.value) * 2} ${selectedToken} on Monad Flip Game! 🎉 Try your luck: ${window.location.href}`;
  const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
};