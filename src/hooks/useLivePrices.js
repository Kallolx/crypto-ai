import { markets } from "@/data/markets";

/* Placeholder quotes. Static for now; replace with a real WebSocket feed when the backend is ready. */
export default function useLivePrices() {
  return markets;
}
