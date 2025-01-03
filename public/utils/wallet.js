document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connect-wallet');
    
    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                connectButton.textContent = `${account.slice(0, 6)}...${account.slice(-4)}`;
                connectButton.classList.add('connected');
            } catch (error) {
                console.error('User denied account access');
            }
        } else {
            window.open('https://metamask.io/download.html', '_blank');
        }
    };

    connectButton.addEventListener('click', connectWallet);
}); 