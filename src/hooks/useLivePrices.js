import { useEffect, useState } from "react";
import { markets } from "@/data/markets";

/* Simulated live quotes: a small random walk every `interval` ms.
   Replace with a real WebSocket feed when the backend is ready. */
export default function useLivePrices(interval = 2200) {
  const [quotes, setQuotes] = useState(() => markets.map((m) => ({ ...m, dir: 0 })));

  useEffect(() => {
    const id = setInterval(() => {
      setQuotes((prev) =>
        prev.map((q) => {
          const drift = (Math.random() - 0.5) * 0.0016;
          const price = q.price * (1 + drift);
          return { ...q, price, change: +(q.change + drift * 100).toFixed(2), dir: Math.sign(drift) };
        })
      );
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return quotes;
}
