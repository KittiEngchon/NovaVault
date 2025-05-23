<script src="https://cdn.jsdelivr.net/npm/ethers/dist/ethers.min.js"></script>
<script>
  let provider;
  let signer;
  let userAddress;

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        document.querySelector("button").textContent = userAddress.slice(0, 6) + '...' + userAddress.slice(-4);
        loadTokenBalances();
        loadNFTs();
      } catch (err) {
        alert("Wallet connection failed.");
        console.error(err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const loadTokenBalances = async () => {
    const tokenList = [
      {
        symbol: "USDC",
        address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // USDC on Polygon
        decimals: 6
      },
      {
        symbol: "MATIC",
        address: "native", // Native token
        decimals: 18
      },
      {
        symbol: "ETH",
        address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", // WETH on Polygon
        decimals: 18
      }
    ];

    const erc20ABI = [
      "function balanceOf(address owner) view returns (uint256)",
      "function decimals() view returns (uint8)"
    ];

    const container = document.querySelector(".section:first-child");
    container.innerHTML = "<h2>My Tokens</h2>";

    for (const token of tokenList) {
      let balance;
      if (token.address === "native") {
        balance = await provider.getBalance(userAddress);
      } else {
        const contract = new ethers.Contract(token.address, erc20ABI, provider);
        balance = await contract.balanceOf(userAddress);
      }

      const formatted = ethers.utils.formatUnits(balance, token.decimals);
      const div = document.createElement("div");
      div.className = "token";
      div.textContent = `${token.symbol}: ${parseFloat(formatted).toFixed(4)}`;
      container.appendChild(div);
    }
  };

  const loadNFTs = async () => {
    const apiKey = "demo"; // Replace with your Alchemy or Moralis key if needed
    const url = `https://polygon-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs?owner=${userAddress}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      const nftContainer = document.querySelector(".section:last-child");
      nftContainer.innerHTML = "<h2>My NFTs</h2>";

      data.ownedNfts?.slice(0, 5).forEach(nft => {
        const div = document.createElement("div");
        div.className = "nft";
        div.innerHTML = `
          <strong>${nft.title || nft.metadata.name || "Unknown NFT"}</strong><br/>
          <img src="${nft.media[0]?.gateway || ""}" alt="NFT"/>
        `;
        nftContainer.appendChild(div);
      });
    } catch (err) {
      console.error("NFT load error:", err);
    }
  };

  document.querySelector("button").addEventListener("click", connectWallet);
</script>
