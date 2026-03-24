export interface PollData {
  id: string;
  name: string;
  percentage: number;
  color: string;
  isExemptFromThreshold?: boolean;
  euGroup?: string; 
  projectedSeats?: number; // NEW: For non-proportional systems like France
}

/**
 * Executes the D'Hondt highest-averages apportionment algorithm.
 * Used to convert polling percentages into exact parliamentary seat counts.
 */
export function calculateDHondtSeats(
  pollingData: PollData[], 
  totalSeats: number, 
  threshold: number
) {
  // NEW: If the data already contains projected seats, skip the math and return it directly
  if (pollingData.length > 0 && pollingData[0].projectedSeats !== undefined) {
    return pollingData.map(party => ({
      id: party.id,
      name: party.name,
      seats: party.projectedSeats || 0,
      color: party.color,
      euGroup: party.euGroup
    })).sort((a, b) => b.seats - a.seats);
  }

  const seatAllocations = new Map<string, number>();
  const eligibleParties: PollData[] = [];

  // 1. Enforce Electoral Thresholds
  pollingData.forEach(party => {
    if (party.percentage >= threshold || party.isExemptFromThreshold) {
      eligibleParties.push(party);
      seatAllocations.set(party.id, 0);
    }
  });

  // 2. Iteratively distribute seats one by one
  for (let currentSeat = 0; currentSeat < totalSeats; currentSeat++) {
    let maximumQuotient = -1;
    let winningPartyId = "";

    for (const party of eligibleParties) {
      const votes = party.percentage;
      const currentlyAllocatedSeats = seatAllocations.get(party.id) || 0;
      
      const quotient = votes / (currentlyAllocatedSeats + 1);

      if (quotient > maximumQuotient) {
        maximumQuotient = quotient;
        winningPartyId = party.id;
      }
    }

    if (winningPartyId !== "") {
      const newSeatTotal = (seatAllocations.get(winningPartyId) || 0) + 1;
      seatAllocations.set(winningPartyId, newSeatTotal);
    }
  }

  // 3. Format the final output
  return eligibleParties.map(party => ({
    id: party.id,
    name: party.name,
    seats: seatAllocations.get(party.id) || 0,
    color: party.color,
    euGroup: party.euGroup 
  })).sort((a, b) => b.seats - a.seats);
}