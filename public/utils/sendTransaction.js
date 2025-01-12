async function sendTransaction(toAddress, amount) {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        try {
            const tx = await signer.sendTransaction({
                to: toAddress,
                value: ethers.utils.parseEther(amount) // Convert amount to wei
            });
            console.log('Transaction successful:', tx);
            alert('Transaction successful!');
        } catch (error) {
            console.error('Transaction error:', error);
            alert('Transaction failed. Please try again.');
        }
    } else {
        alert('Please install MetaMask or another Web3 wallet');
    }
} 