import { NextResponse } from 'next/server';
import { calculateDHondtSeats, PollData } from '../../../utils/elections';
import { europeanData } from '../../../utils/countryData';

const countryConfigs: Record<string, any> = {
  Germany: {
    apiUrl: 'https://www.politico.eu/wp-json/politico/v1/poll-of-polls/DE-parliament',
    totalSeats: 630,
    threshold: 5.0,
    dictionary: {
      'cdu/csu': { id: 'cdu', name: 'CDU/CSU', color: '#000000', euGroup: 'EPP' },
      'afd': { id: 'afd', name: 'AfD', color: '#009EE0', euGroup: 'ESN' },
      'spd': { id: 'spd', name: 'SPD', color: '#E3000F', euGroup: 'S&D' },
      'grüne': { id: 'gruene', name: 'Grüne', color: '#46962B', euGroup: 'Greens' },
      'die linke': { id: 'linke', name: 'Die Linke', color: '#B22222', euGroup: 'Left' },
      'bsw': { id: 'bsw', name: 'BSW', color: '#7A3B54', euGroup: 'NI' },
      'fdp': { id: 'fdp', name: 'FDP', color: '#FFED00', euGroup: 'Renew' }
    },
    extras: [{ id: 'ssw', name: 'SSW', percentage: 0.2, color: '#003C8F', isExemptFromThreshold: true, euGroup: 'Greens' }]
  },
  France: {
    apiUrl: 'https://www.politico.eu/wp-json/politico/v1/poll-of-polls/FR-parliament',
    totalSeats: 577,
    threshold: 0,
    dictionary: {
      'rassemblement national': { id: 'rn', name: 'RN & Allies', color: '#004A77', euGroup: 'PfE', projectedSeats: 210 },
      'nouveau front populaire': { id: 'nfp', name: 'NFP', color: '#E4003B', euGroup: 'Mixed', projectedSeats: 180 },
      'ensemble': { id: 'ens', name: 'Ensemble', color: '#FFEB00', euGroup: 'Renew', projectedSeats: 130 },
      'les républicains': { id: 'lr', name: 'LR', color: '#0066CC', euGroup: 'EPP', projectedSeats: 57 }
    }
  },
  Italy: {
    apiUrl: 'https://www.politico.eu/wp-json/politico/v1/poll-of-polls/IT-parliament',
    totalSeats: 400,
    threshold: 3.0,
    dictionary: {
      'fratelli d\'italia': { id: 'fdi', name: 'FdI', color: '#0A3A8A', euGroup: 'ECR' },
      'partito democratico': { id: 'pd', name: 'PD', color: '#E32636', euGroup: 'S&D' },
      'movimento 5 stelle': { id: 'm5s', name: 'M5S', color: '#FFEB3B', euGroup: 'Left' },
      'lega': { id: 'lega', name: 'Lega', color: '#008F39', euGroup: 'PfE' },
      'forza italia': { id: 'fi', name: 'Forza Italia', color: '#00BFFF', euGroup: 'EPP' },
      'alleanza verdi e sinistra': { id: 'avs', name: 'AVS', color: '#4CAF50', euGroup: 'Greens' }
    }
  },
  Spain: {
    apiUrl: 'https://www.politico.eu/wp-json/politico/v1/poll-of-polls/ES-parliament',
    totalSeats: 350,
    threshold: 0,
    dictionary: {
      'partido popular': { id: 'pp', name: 'PP', color: '#1D84CE', euGroup: 'EPP' },
      'psoe': { id: 'psoe', name: 'PSOE', color: '#EF1C27', euGroup: 'S&D' },
      'vox': { id: 'vox', name: 'Vox', color: '#63BE21', euGroup: 'PfE' },
      'sumar': { id: 'sumar', name: 'Sumar', color: '#E51C55', euGroup: 'Left' },
      'esquerra republicana': { id: 'erc', name: 'ERC', color: '#FFB232', euGroup: 'Greens' },
      'junts per catalunya': { id: 'junts', name: 'Junts', color: '#4DBEA3', euGroup: 'NI' }
    }
  },
  Poland: {
    apiUrl: 'https://www.politico.eu/wp-json/politico/v1/poll-of-polls/PL-parliament',
    totalSeats: 460,
    threshold: 5.0,
    dictionary: {
      'koalicja obywatelska': { id: 'ko', name: 'KO', color: '#F68F2D', euGroup: 'EPP' },
      'prawo i sprawiedliwość': { id: 'pis', name: 'PiS', color: '#002E6D', euGroup: 'ECR' },
      'trzecia droga': { id: 'td', name: 'Third Way', color: '#F0E600', euGroup: 'Renew' },
      'konfederacja': { id: 'konf', name: 'Confederation', color: '#1B263B', euGroup: 'ESN' },
      'nowa lewica': { id: 'lew', name: 'The Left', color: '#C8102E', euGroup: 'S&D' }
    }
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country') || '';

  if (!countryConfigs[country]) {
    return NextResponse.json({ error: "Country not supported yet." }, { status: 400 });
  }

  const config = countryConfigs[country];

  try {
    const res = await fetch(config.apiUrl, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      },
      next: { revalidate: 3600 } 
    });
    
    if (!res.ok) throw new Error(`API blocked request. Status: ${res.status}`);

    const data = await res.json();
    const latestPolls = data.trends?.[0]?.active_parties || [];
    
    if (latestPolls.length === 0) throw new Error("No polling data found.");

    const livePercentages: PollData[] = latestPolls.map((party: any) => {
      const normalizedName = party.name.toLowerCase();
      const dict = config.dictionary[normalizedName];

      if (dict) {
        return {
          id: dict.id,
          name: dict.name,
          percentage: parseFloat(party.trend),
          color: dict.color,
          euGroup: dict.euGroup,
          projectedSeats: dict.projectedSeats 
        };
      }
      return null;
    }).filter(Boolean);

    if (config.extras) {
      livePercentages.push(...config.extras);
    }

    const calculatedSeats = calculateDHondtSeats(livePercentages, config.totalSeats, config.threshold);
    return NextResponse.json({ polls: calculatedSeats });

  } catch (error) {
    console.warn(`Falling back to static database for ${country}:`, error);
    // NEW: Gracefully fail and serve the static database data if Politico blocks the request
    return NextResponse.json({ polls: europeanData[country].pollParties });
  }
}