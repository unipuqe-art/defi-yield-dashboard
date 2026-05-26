```javascript
/**
 * Custom hook to fetch real-time DeFi yield data from multiple chains.
 *
 * @param {Array<string>} chainIds - Array of chain IDs to fetch yield data for.
 * @returns {Object} An object containing the yield data and loading/error states.
 */
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useYieldHook = (chainIds) => {
  const [yieldData, setYieldData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allData = {};
        
        for (const chainId of chainIds) {
          // Simulate fetching yield data from a contract
          const provider = new ethers.providers.JsonRpcProvider(`https://rpc-mainnet.ethereum.org`);
          const tokenContractAddress = '0xYourTokenAddress'; // Replace with actual contract address
          
          // Fetch yield data for the current chain
          const [tokenPrice, totalYield] = await Promise.all([
            provider.getGasPrice(), // Example data, replace with actual logic
            ethers.utils.formatEther(await provider.getBalance(tokenContractAddress)) // Example data, replace with actual logic
          ]);
          
          allData[chainId] = {
            chainId,
            tokenPrice: ethers.utils.formatUnits(tokenPrice, 'gwei'),
            totalYield
          };
        }
        
        setYieldData(allData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [chainIds]);

  return { yieldData, loading, error };
};

export default useYieldHook;
```