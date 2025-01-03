// Wallet connection utilities
class WalletConnector {
    constructor() {
        this.isConnected = false;
        this.address = null;
        this.init();
        this.debugMode = true; // Enable debug mode
    }

    init() {
        // Initialize connect button
        const connectButton = document.getElementById('connect-wallet');
        if (connectButton) {
            connectButton.addEventListener('click', () => this.handleConnect());
        }
        if (this.debugMode) {
            console.log('WalletConnector initialized');
            console.log('Is Mobile:', this.isMobile());
        }
    }

    isMobile() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (this.debugMode) {
            console.log('UserAgent:', navigator.userAgent);
            console.log('Detected as mobile:', isMobile);
        }
        return isMobile;
    }

    async handleConnect() {
        if (this.isMobile()) {
            this.handleMobileConnect();
        } else {
            this.handleDesktopConnect();
        }
    }

    handleMobileConnect() {
        const wallets = {
            metamask: 'https://metamask.app.link/dapp/',
            rainbow: 'https://rainbow.me/connect',
            trustwallet: 'https://link.trustwallet.com/',
            phantom: 'https://phantom.app/connect'
        };

        if (this.debugMode) {
            console.log('Mobile connect handler triggered');
        }

        // Create mobile wallet selection modal
        const modal = document.createElement('div');
        modal.className = 'wallet-modal';
        modal.innerHTML = `
            <div class="wallet-modal-content">
                <h3>Connect Wallet</h3>
                <div class="wallet-options">
                    ${Object.entries(wallets).map(([name, url]) => `
                        <button class="wallet-option" data-wallet="${name}" data-url="${url}">
                            ${name.charAt(0).toUpperCase() + name.slice(1)}
                        </button>
                    `).join('')}
                </div>
                <button class="close-modal">Close</button>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .wallet-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .wallet-modal-content {
                background: var(--background-color);
                padding: 2rem;
                border-radius: 12px;
                max-width: 90%;
                width: 320px;
            }
            .wallet-modal h3 {
                margin-bottom: 1.5rem;
                text-align: center;
                color: var(--accent-color);
            }
            .wallet-options {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            .wallet-option {
                background: transparent;
                border: 2px solid var(--accent-color);
                color: var(--accent-color);
                padding: 1rem;
                border-radius: 8px;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .wallet-option:hover {
                background: var(--accent-color);
                color: var(--background-color);
            }
            .close-modal {
                margin-top: 1rem;
                width: 100%;
                padding: 0.8rem;
                background: transparent;
                border: 1px solid var(--accent-color);
                color: var(--accent-color);
                border-radius: 8px;
                cursor: pointer;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(modal);

        // Handle wallet selection with debug logging
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('wallet-option')) {
                const wallet = e.target.dataset.wallet;
                const url = e.target.dataset.url + window.location.href;
                if (this.debugMode) {
                    console.log('Selected wallet:', wallet);
                    console.log('Redirect URL:', url);
                    // For testing, show alert instead of redirect
                    alert(`Debug: Would redirect to ${url}`);
                } else {
                    window.location.href = url;
                }
            } else if (e.target.classList.contains('close-modal') || e.target === modal) {
                if (this.debugMode) {
                    console.log('Modal closed');
                }
                modal.remove();
            }
        });
    }

    async handleDesktopConnect() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                this.handleSuccess(accounts[0]);
            } catch (error) {
                this.handleError(error);
            }
        } else {
            alert('Please install MetaMask or another Web3 wallet');
        }
    }

    handleSuccess(address) {
        this.isConnected = true;
        this.address = address;
        const connectButton = document.getElementById('connect-wallet');
        if (connectButton) {
            connectButton.textContent = `${address.slice(0, 6)}...${address.slice(-4)}`;
            connectButton.classList.add('connected');
        }
    }

    handleError(error) {
        console.error('Wallet connection error:', error);
        alert('Failed to connect wallet. Please try again.');
    }
}

// Initialize wallet connector when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WalletConnector();
}); 