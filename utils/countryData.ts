import { Party } from '../components/ParliamentChart';
import { PollData, calculateDHondtSeats } from './elections';

export interface CountryData {
  totalSeats: number;
  electoralNote?: string;
  electionParties: Party[];
  pollParties: Party[];
}

export const europeanData: Record<string, CountryData> = {
  Germany: {
    totalSeats: 630,
    electoralNote: "The 2025 reform strictly capped the Bundestag at 630 seats. Parties must secure 5% of the national vote to enter, except for recognized minority parties like the SSW.",
    electionParties: [
      { id: 'cdu', name: 'CDU/CSU', seats: 208, color: '#000000', euGroup: 'EPP' },
      { id: 'afd', name: 'AfD', seats: 152, color: '#009EE0', euGroup: 'ESN' },
      { id: 'spd', name: 'SPD', seats: 120, color: '#E3000F', euGroup: 'S&D' },
      { id: 'gruene', name: 'Grüne', seats: 85, color: '#46962B', euGroup: 'Greens' },
      { id: 'linke', name: 'Die Linke', seats: 64, color: '#B22222', euGroup: 'Left' },
      { id: 'ssw', name: 'SSW', seats: 1, color: '#003C8F', euGroup: 'Greens' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'cdu', name: 'CDU/CSU', percentage: 32.0, color: '#000000', euGroup: 'EPP' },
      { id: 'afd', name: 'AfD', percentage: 18.0, color: '#009EE0', euGroup: 'ESN' },
      { id: 'spd', name: 'SPD', percentage: 14.0, color: '#E3000F', euGroup: 'S&D' },
      { id: 'gruene', name: 'Grüne', percentage: 10.0, color: '#46962B', euGroup: 'Greens' },
      { id: 'bsw', name: 'BSW', percentage: 8.0, color: '#7A3B54', euGroup: 'NI' }, 
      { id: 'linke', name: 'Die Linke', percentage: 3.0, color: '#B22222', euGroup: 'Left' }, 
      { id: 'fdp', name: 'FDP', percentage: 4.0, color: '#FFED00', euGroup: 'Renew' },
      { id: 'ssw', name: 'SSW', percentage: 0.2, color: '#003C8F', isExemptFromThreshold: true, euGroup: 'Greens' }
    ], 630, 5.0)
  },
  Denmark: {
    totalSeats: 179,
    electoralNote: "Denmark uses proportional representation for 175 mainland seats. The remaining 4 are strictly reserved for the autonomous territories of Greenland (2) and the Faroe Islands (2).",
    electionParties: [
      { id: 'soc', name: 'Socialdemokratiet', seats: 50, color: '#E32E30', euGroup: 'S&D' },
      { id: 'ven', name: 'Venstre', seats: 23, color: '#0054A4', euGroup: 'Renew' },
      { id: 'dd', name: 'Danmarksdemokraterne', seats: 16, color: '#8DBFE2', euGroup: 'ECR' },
      { id: 'sfp', name: 'SF', seats: 15, color: '#E07EA8', euGroup: 'Greens' },
      { id: 'lib', name: 'Liberal Alliance', seats: 15, color: '#00CACA', euGroup: 'EPP' },
      { id: 'mod', name: 'Moderaterne', seats: 12, color: '#800080', euGroup: 'Renew' },
      { id: 'kon', name: 'Konservative', seats: 10, color: '#005E3C', euGroup: 'EPP' },
      { id: 'enh', name: 'Enhedslisten', seats: 9, color: '#FF7300', euGroup: 'Left' },
      { id: 'df', name: 'Dansk Folkeparti', seats: 7, color: '#O2254B', euGroup: 'PfE' },
      { id: 'rad', name: 'Radikale Venstre', seats: 6, color: '#FF00FF', euGroup: 'Renew' },
      { id: 'alt', name: 'Alternativet', seats: 6, color: '#00FF00', euGroup: 'Greens' },
      { id: 'bp', name: 'Borgernes Parti', seats: 1, color: '#000000' },
      { id: 'ufg', name: 'Independents', seats: 5, color: '#CCCCCC' },
      { id: 'ia', name: 'Inuit Ataqatigiit', seats: 1, color: '#E3000F', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_Greenland.svg' },
      { id: 'nal', name: 'Naleraq', seats: 1, color: '#FF8C00', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_Greenland.svg' },
      { id: 'sam', name: 'Sambandsflokkurin', seats: 1, color: '#0033A0', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Flag_of_the_Faroe_Islands.svg' },
      { id: 'jav', name: 'Javnaðarflokkurin', seats: 1, color: '#D22B2B', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Flag_of_the_Faroe_Islands.svg' }
    ],
    pollParties: [
      ...calculateDHondtSeats([
        { id: 'soc', name: 'Socialdemokratiet', percentage: 21.5, color: '#E32E30', euGroup: 'S&D' },
        { id: 'ven', name: 'Venstre', percentage: 9.8, color: '#0054A4', euGroup: 'Renew' },
        { id: 'dd', name: 'Danmarksdemokraterne', percentage: 10.2, color: '#8DBFE2', euGroup: 'ECR' },
        { id: 'sfp', name: 'SF', percentage: 14.5, color: '#E07EA8', euGroup: 'Greens' },
        { id: 'lib', name: 'Liberal Alliance', percentage: 13.5, color: '#00CACA', euGroup: 'EPP' },
        { id: 'mod', name: 'Moderaterne', percentage: 6.2, color: '#800080', euGroup: 'Renew' },
        { id: 'kon', name: 'Konservative', percentage: 5.5, color: '#005E3C', euGroup: 'EPP' },
        { id: 'enh', name: 'Enhedslisten', percentage: 7.1, color: '#FF7300', euGroup: 'Left' },
        { id: 'df', name: 'Dansk Folkeparti', percentage: 4.5, color: '#O2254B', euGroup: 'PfE' },
        { id: 'rad', name: 'Radikale Venstre', percentage: 4.1, color: '#FF00FF', euGroup: 'Renew' },
        { id: 'alt', name: 'Alternativet', percentage: 3.1, color: '#00FF00', euGroup: 'Greens' }
      ], 175, 2.0),
      { id: 'ia', name: 'Inuit Ataqatigiit', seats: 1, color: '#E3000F', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_Greenland.svg' },
      { id: 'nal', name: 'Naleraq', seats: 1, color: '#FF8C00', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_Greenland.svg' },
      { id: 'sam', name: 'Sambandsflokkurin', seats: 1, color: '#0033A0', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Flag_of_the_Faroe_Islands.svg' },
      { id: 'jav', name: 'Javnaðarflokkurin', seats: 1, color: '#D22B2B', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Flag_of_the_Faroe_Islands.svg' }
    ]
  },
  France: {
    totalSeats: 577,
    electoralNote: "France uses a two-round majoritarian system in single-member districts. Because of this, national polling percentages cannot be proportionally converted into seats.",
    electionParties: [
      { id: 'nfp', name: 'NFP', seats: 193, color: '#E4003B', euGroup: 'Mixed' },
      { id: 'ens', name: 'Ensemble', seats: 168, color: '#FFEB00', euGroup: 'Renew' },
      { id: 'rn', name: 'RN & Allies', seats: 142, color: '#004A77', euGroup: 'PfE' },
      { id: 'lr', name: 'LR', seats: 46, color: '#0066CC', euGroup: 'EPP' },
      { id: 'oth', name: 'LIOT / Others', seats: 28, color: '#808080', euGroup: 'NI' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'nfp', name: 'NFP', percentage: 28.0, projectedSeats: 180, color: '#E4003B', euGroup: 'Mixed' },
      { id: 'ens', name: 'Ensemble', percentage: 20.0, projectedSeats: 130, color: '#FFEB00', euGroup: 'Renew' },
      { id: 'rn', name: 'RN & Allies', percentage: 32.0, projectedSeats: 210, color: '#004A77', euGroup: 'PfE' },
      { id: 'lr', name: 'LR', percentage: 8.0, projectedSeats: 57, color: '#0066CC', euGroup: 'EPP' }
    ], 577, 0)
  },
  Italy: {
    totalSeats: 400,
    electoralNote: "Italy uses a mixed system (Rosatellum) where 3/8 of seats are elected directly and 5/8 proportionally. It also includes an 'Overseas Constituency' for Italians living abroad.",
    electionParties: [
      { id: 'fdi', name: 'FdI', seats: 119, color: '#0A3A8A', euGroup: 'ECR' },
      { id: 'pd', name: 'PD', seats: 69, color: '#E32636', euGroup: 'S&D' },
      { id: 'lega', name: 'Lega', seats: 66, color: '#008F39', euGroup: 'PfE' },
      { id: 'm5s', name: 'M5S', seats: 52, color: '#FFEB3B', euGroup: 'Left' },
      { id: 'fi', name: 'Forza Italia', seats: 45, color: '#00BFFF', euGroup: 'EPP' },
      { id: 'az', name: 'Az-IV', seats: 21, color: '#FF00FF', euGroup: 'Renew' },
      { id: 'avs', name: 'AVS', seats: 12, color: '#4CAF50', euGroup: 'Greens' },
      { id: 'oth', name: 'Others', seats: 16, color: '#808080', euGroup: 'NI' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'fdi', name: 'FdI', percentage: 28.5, color: '#0A3A8A', euGroup: 'ECR' },
      { id: 'pd', name: 'PD', percentage: 20.0, color: '#E32636', euGroup: 'S&D' },
      { id: 'm5s', name: 'M5S', percentage: 16.0, color: '#FFEB3B', euGroup: 'Left' },
      { id: 'lega', name: 'Lega', percentage: 8.5, color: '#008F39', euGroup: 'PfE' },
      { id: 'fi', name: 'Forza Italia', percentage: 7.5, color: '#00BFFF', euGroup: 'EPP' },
      { id: 'avs', name: 'AVS', percentage: 4.0, color: '#4CAF50', euGroup: 'Greens' }
    ], 400, 3.0)
  },
  Spain: {
    totalSeats: 350,
    electoralNote: "Spain uses proportional representation, but many small provincial districts heavily penalize smaller national parties. Ceuta and Melilla have dedicated seats in North Africa.",
    electionParties: [
      { id: 'pp', name: 'PP', seats: 137, color: '#1D84CE', euGroup: 'EPP' },
      { id: 'psoe', name: 'PSOE', seats: 121, color: '#EF1C27', euGroup: 'S&D' },
      { id: 'vox', name: 'Vox', seats: 33, color: '#63BE21', euGroup: 'PfE' },
      { id: 'sumar', name: 'Sumar', seats: 31, color: '#E51C55', euGroup: 'Left' },
      { id: 'erc', name: 'ERC', seats: 7, color: '#FFB232', euGroup: 'Greens' },
      { id: 'junts', name: 'Junts', seats: 7, color: '#4DBEA3', euGroup: 'NI' },
      { id: 'bildu', name: 'EH Bildu', seats: 6, color: '#B2C200', euGroup: 'Left' },
      { id: 'oth', name: 'Others', seats: 8, color: '#808080', euGroup: 'Mixed' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'pp', name: 'PP', percentage: 34.0, projectedSeats: 145, color: '#1D84CE', euGroup: 'EPP' },
      { id: 'psoe', name: 'PSOE', percentage: 30.0, projectedSeats: 125, color: '#EF1C27', euGroup: 'S&D' },
      { id: 'vox', name: 'Vox', percentage: 11.0, projectedSeats: 30, color: '#63BE21', euGroup: 'PfE' },
      { id: 'sumar', name: 'Sumar', percentage: 10.0, projectedSeats: 25, color: '#E51C55', euGroup: 'Left' },
      { id: 'erc', name: 'ERC', percentage: 2.5, projectedSeats: 7, color: '#FFB232', euGroup: 'Greens' },
      { id: 'junts', name: 'Junts', percentage: 2.0, projectedSeats: 7, color: '#4DBEA3', euGroup: 'NI' }
    ], 350, 0)
  },
  Poland: {
    totalSeats: 460,
    electoralNote: "Poland uses open-list proportional representation. Single parties must reach a 5% threshold to enter the Sejm, while official coalitions must reach 8%.",
    electionParties: [
      { id: 'pis', name: 'PiS', seats: 194, color: '#002E6D', euGroup: 'ECR' },
      { id: 'ko', name: 'KO', seats: 157, color: '#F68F2D', euGroup: 'EPP' },
      { id: 'td', name: 'Third Way', seats: 65, color: '#F0E600', euGroup: 'Renew' },
      { id: 'lew', name: 'The Left', seats: 26, color: '#C8102E', euGroup: 'S&D' },
      { id: 'konf', name: 'Confederation', seats: 18, color: '#1B263B', euGroup: 'ESN' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'ko', name: 'KO', percentage: 32.0, color: '#F68F2D', euGroup: 'EPP' },
      { id: 'pis', name: 'PiS', percentage: 30.0, color: '#002E6D', euGroup: 'ECR' },
      { id: 'td', name: 'Third Way', percentage: 14.0, color: '#F0E600', euGroup: 'Renew' },
      { id: 'konf', name: 'Confederation', percentage: 10.0, color: '#1B263B', euGroup: 'ESN' },
      { id: 'lew', name: 'The Left', percentage: 8.0, color: '#C8102E', euGroup: 'S&D' }
    ], 460, 5.0)
  },
  Netherlands: {
    totalSeats: 150,
    electoralNote: "The Netherlands uses a single nationwide constituency with virtually no electoral threshold (0.67%), leading to highly proportional but fragmented parliaments.",
    electionParties: [
      { id: 'pvv', name: 'PVV', seats: 37, color: '#232D58', euGroup: 'PfE' },
      { id: 'glpvda', name: 'GL-PvdA', seats: 25, color: '#DF111A', euGroup: 'Mixed' },
      { id: 'vvd', name: 'VVD', seats: 24, color: '#FF7F00', euGroup: 'Renew' },
      { id: 'nsc', name: 'NSC', seats: 20, color: '#7FA1C3', euGroup: 'EPP' },
      { id: 'd66', name: 'D66', seats: 9, color: '#00B900', euGroup: 'Renew' },
      { id: 'bbb', name: 'BBB', seats: 7, color: '#94C11F', euGroup: 'EPP' },
      { id: 'cda', name: 'CDA', seats: 5, color: '#007C5E', euGroup: 'EPP' },
      { id: 'sp', name: 'SP', seats: 5, color: '#E11514', euGroup: 'NI' },
      { id: 'oth', name: 'Others', seats: 18, color: '#808080', euGroup: 'Mixed' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'pvv', name: 'PVV', percentage: 25.0, color: '#232D58', euGroup: 'PfE' },
      { id: 'glpvda', name: 'GL-PvdA', percentage: 16.0, color: '#DF111A', euGroup: 'Mixed' },
      { id: 'vvd', name: 'VVD', percentage: 14.0, color: '#FF7F00', euGroup: 'Renew' },
      { id: 'nsc', name: 'NSC', percentage: 8.0, color: '#7FA1C3', euGroup: 'EPP' },
      { id: 'd66', name: 'D66', percentage: 7.0, color: '#00B900', euGroup: 'Renew' },
      { id: 'bbb', name: 'BBB', percentage: 5.0, color: '#94C11F', euGroup: 'EPP' }
    ], 150, 0.67)
  },
  Sweden: {
    totalSeats: 349,
    electoralNote: "Sweden uses a modified Sainte-Laguë method. 310 seats are distributed locally, and 39 are 'leveling seats' to ensure absolute national proportionality.",
    electionParties: [
      { id: 'sap', name: 'Socialdemokraterna', seats: 107, color: '#E8112d', euGroup: 'S&D' },
      { id: 'sd', name: 'Sverigedemokraterna', seats: 73, color: '#DDDD00', euGroup: 'ECR' },
      { id: 'm', name: 'Moderaterna', seats: 68, color: '#52BDEC', euGroup: 'EPP' },
      { id: 'v', name: 'Vänsterpartiet', seats: 24, color: '#DA291C', euGroup: 'Left' },
      { id: 'c', name: 'Centerpartiet', seats: 24, color: '#009933', euGroup: 'Renew' },
      { id: 'kd', name: 'Kristdemokraterna', seats: 19, color: '#000077', euGroup: 'EPP' },
      { id: 'mp', name: 'Miljöpartiet', seats: 18, color: '#83CF39', euGroup: 'Greens' },
      { id: 'l', name: 'Liberalerna', seats: 16, color: '#006AB3', euGroup: 'Renew' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'sap', name: 'Socialdemokraterna', percentage: 33.0, color: '#E8112d', euGroup: 'S&D' },
      { id: 'sd', name: 'Sverigedemokraterna', percentage: 19.0, color: '#DDDD00', euGroup: 'ECR' },
      { id: 'm', name: 'Moderaterna', percentage: 18.0, color: '#52BDEC', euGroup: 'EPP' },
      { id: 'v', name: 'Vänsterpartiet', percentage: 8.0, color: '#DA291C', euGroup: 'Left' },
      { id: 'c', name: 'Centerpartiet', percentage: 5.0, color: '#009933', euGroup: 'Renew' },
      { id: 'kd', name: 'Kristdemokraterna', percentage: 5.0, color: '#000077', euGroup: 'EPP' },
      { id: 'mp', name: 'Miljöpartiet', percentage: 5.0, color: '#83CF39', euGroup: 'Greens' },
      { id: 'l', name: 'Liberalerna', percentage: 4.0, color: '#006AB3', euGroup: 'Renew' }
    ], 349, 4.0)
  },
  Austria: {
    totalSeats: 183,
    electoralNote: "Austria uses a three-tier proportional representation system. A party must achieve a 4% national threshold or win a direct mandate in a regional constituency.",
    electionParties: [
      { id: 'fpo', name: 'FPÖ', seats: 57, color: '#0056A2', euGroup: 'PfE' },
      { id: 'ovp', name: 'ÖVP', seats: 51, color: '#61C250', euGroup: 'EPP' },
      { id: 'spo', name: 'SPÖ', seats: 41, color: '#CE000C', euGroup: 'S&D' },
      { id: 'neos', name: 'NEOS', seats: 18, color: '#E84188', euGroup: 'Renew' },
      { id: 'gruene', name: 'Grüne', seats: 16, color: '#88B626', euGroup: 'Greens' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'fpo', name: 'FPÖ', percentage: 28.8, color: '#0056A2', euGroup: 'PfE' },
      { id: 'ovp', name: 'ÖVP', percentage: 26.3, color: '#61C250', euGroup: 'EPP' },
      { id: 'spo', name: 'SPÖ', percentage: 21.1, color: '#CE000C', euGroup: 'S&D' },
      { id: 'neos', name: 'NEOS', percentage: 9.1, color: '#E84188', euGroup: 'Renew' },
      { id: 'gruene', name: 'Grüne', percentage: 8.2, color: '#88B626', euGroup: 'Greens' }
    ], 183, 4.0)
  },
  Belgium: {
    totalSeats: 150,
    electoralNote: "Belgium's parliament is heavily divided by language. There are no national parties; separate Flemish and Francophone parties compete in their respective regions.",
    electionParties: [
      { id: 'nva', name: 'N-VA', seats: 24, color: '#F2A900', euGroup: 'ECR' },
      { id: 'vb', name: 'Vlaams Belang', seats: 20, color: '#FFE900', euGroup: 'PfE' },
      { id: 'mr', name: 'MR', seats: 20, color: '#0000FF', euGroup: 'Renew' },
      { id: 'ps', name: 'PS', seats: 16, color: '#FF0000', euGroup: 'S&D' },
      { id: 'pvda', name: 'PTB-PVDA', seats: 15, color: '#DA121A', euGroup: 'Left' },
      { id: 'le', name: 'Les Engagés', seats: 14, color: '#00A88F', euGroup: 'Renew' },
      { id: 'vooruit', name: 'Vooruit', seats: 13, color: '#FF2900', euGroup: 'S&D' },
      { id: 'cdv', name: 'CD&V', seats: 11, color: '#FF7F20', euGroup: 'EPP' },
      { id: 'oth', name: 'Others', seats: 17, color: '#808080', euGroup: 'Mixed' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'nva', name: 'N-VA', percentage: 16.7, projectedSeats: 24, color: '#F2A900', euGroup: 'ECR' },
      { id: 'vb', name: 'Vlaams Belang', percentage: 13.8, projectedSeats: 20, color: '#FFE900', euGroup: 'PfE' },
      { id: 'mr', name: 'MR', percentage: 10.3, projectedSeats: 20, color: '#0000FF', euGroup: 'Renew' },
      { id: 'ps', name: 'PS', percentage: 8.0, projectedSeats: 16, color: '#FF0000', euGroup: 'S&D' },
      { id: 'pvda', name: 'PTB-PVDA', percentage: 9.9, projectedSeats: 15, color: '#DA121A', euGroup: 'Left' },
      { id: 'le', name: 'Les Engagés', percentage: 6.8, projectedSeats: 14, color: '#00A88F', euGroup: 'Renew' }
    ], 150, 0)
  },
  Greece: {
    totalSeats: 300,
    electoralNote: "Greece uses reinforced proportionality. The winning party is awarded a sliding-scale 'majority bonus' of up to 50 extra seats to ensure government stability.",
    electionParties: [
      { id: 'nd', name: 'ND', seats: 158, color: '#0047AB', euGroup: 'EPP' },
      { id: 'syriza', name: 'SYRIZA', seats: 36, color: '#E40613', euGroup: 'Left' },
      { id: 'pasok', name: 'PASOK', seats: 32, color: '#008000', euGroup: 'S&D' },
      { id: 'kke', name: 'KKE', seats: 21, color: '#E3000F', euGroup: 'NI' },
      { id: 'gs', name: 'Greek Solution', seats: 12, color: '#0000FF', euGroup: 'ECR' },
      { id: 'spartans', name: 'Spartans', seats: 12, color: '#000000', euGroup: 'NI' },
      { id: 'oth', name: 'Others', seats: 29, color: '#808080', euGroup: 'Mixed' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'nd', name: 'ND', percentage: 30.0, projectedSeats: 130, color: '#0047AB', euGroup: 'EPP' },
      { id: 'pasok', name: 'PASOK', percentage: 18.0, projectedSeats: 55, color: '#008000', euGroup: 'S&D' },
      { id: 'syriza', name: 'SYRIZA', percentage: 10.0, projectedSeats: 30, color: '#E40613', euGroup: 'Left' },
      { id: 'gs', name: 'Greek Solution', percentage: 10.0, projectedSeats: 30, color: '#0000FF', euGroup: 'ECR' },
      { id: 'kke', name: 'KKE', percentage: 9.0, projectedSeats: 25, color: '#E3000F', euGroup: 'NI' }
    ], 300, 0)
  },
  Portugal: {
    totalSeats: 230,
    electoralNote: "Portugal uses closed-list proportional representation in multi-member constituencies. The D'Hondt method is applied at the district level.",
    electionParties: [
      { id: 'ad', name: 'AD', seats: 80, color: '#FF9900', euGroup: 'EPP' },
      { id: 'ps', name: 'PS', seats: 78, color: '#FF66FF', euGroup: 'S&D' },
      { id: 'chega', name: 'Chega', seats: 50, color: '#202056', euGroup: 'PfE' },
      { id: 'il', name: 'IL', seats: 8, color: '#00AEEF', euGroup: 'Renew' },
      { id: 'be', name: 'BE', seats: 5, color: '#CC0000', euGroup: 'Left' },
      { id: 'cdu', name: 'CDU', seats: 4, color: '#FF0000', euGroup: 'Left' },
      { id: 'livre', name: 'Livre', seats: 4, color: '#90C044', euGroup: 'Greens' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'ad', name: 'AD', percentage: 32.0, projectedSeats: 85, color: '#FF9900', euGroup: 'EPP' },
      { id: 'ps', name: 'PS', percentage: 29.0, projectedSeats: 78, color: '#FF66FF', euGroup: 'S&D' },
      { id: 'chega', name: 'Chega', percentage: 16.0, projectedSeats: 45, color: '#202056', euGroup: 'PfE' },
      { id: 'il', name: 'IL', percentage: 6.0, projectedSeats: 10, color: '#00AEEF', euGroup: 'Renew' },
      { id: 'be', name: 'BE', percentage: 5.0, projectedSeats: 6, color: '#CC0000', euGroup: 'Left' }
    ], 230, 0)
  },
  Ireland: {
    totalSeats: 174,
    electoralNote: "Ireland uses the Single Transferable Vote (STV), a ranked-choice system where voters rank individual candidates, making strict national polling projections difficult.",
    electionParties: [
      { id: 'ff', name: 'Fianna Fáil', seats: 48, color: '#66BB66', euGroup: 'Renew' },
      { id: 'fg', name: 'Fine Gael', seats: 38, color: '#6699FF', euGroup: 'EPP' },
      { id: 'sf', name: 'Sinn Féin', seats: 37, color: '#326760', euGroup: 'Left' },
      { id: 'sd', name: 'Social Democrats', seats: 11, color: '#752F8B', euGroup: 'S&D' },
      { id: 'lab', name: 'Labour', seats: 11, color: '#CC0000', euGroup: 'S&D' },
      { id: 'gp', name: 'Green Party', seats: 3, color: '#99CC33', euGroup: 'Greens' },
      { id: 'ind', name: 'Independents', seats: 26, color: '#FFFFFF', euGroup: 'NI' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'ff', name: 'Fianna Fáil', percentage: 25.0, projectedSeats: 48, color: '#66BB66', euGroup: 'Renew' },
      { id: 'fg', name: 'Fine Gael', percentage: 22.0, projectedSeats: 38, color: '#6699FF', euGroup: 'EPP' },
      { id: 'sf', name: 'Sinn Féin', percentage: 18.0, projectedSeats: 37, color: '#326760', euGroup: 'Left' },
      { id: 'ind', name: 'Independents', percentage: 15.0, projectedSeats: 20, color: '#FFFFFF', euGroup: 'NI' }
    ], 174, 0)
  },
  Romania: {
    totalSeats: 330,
    electoralNote: "Romania uses party-list proportional representation with a 5% threshold for single parties and up to 10% for alliances.",
    electionParties: [
      { id: 'psd', name: 'PSD', seats: 110, color: '#DC143C', euGroup: 'S&D' },
      { id: 'pnl', name: 'PNL', seats: 79, color: '#F4D03F', euGroup: 'EPP' },
      { id: 'aur', name: 'AUR', seats: 31, color: '#FFD700', euGroup: 'ECR' },
      { id: 'usr', name: 'USR', seats: 41, color: '#00AEEF', euGroup: 'Renew' },
      { id: 'udmr', name: 'UDMR', seats: 20, color: '#006B31', euGroup: 'EPP' },
      { id: 'min', name: 'Minorities', seats: 18, color: '#808080', euGroup: 'NI' },
      { id: 'ind', name: 'Others', seats: 31, color: '#CCCCCC', euGroup: 'Mixed' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'psd', name: 'PSD', percentage: 30.0, color: '#DC143C', euGroup: 'S&D' },
      { id: 'pnl', name: 'PNL', percentage: 20.0, color: '#F4D03F', euGroup: 'EPP' },
      { id: 'aur', name: 'AUR', percentage: 18.0, color: '#FFD700', euGroup: 'ECR' },
      { id: 'usr', name: 'USR', percentage: 14.0, color: '#00AEEF', euGroup: 'Renew' },
      { id: 'udmr', name: 'UDMR', percentage: 5.0, color: '#006B31', euGroup: 'EPP' }
    ], 330, 5.0)
  },
  Czechia: {
    totalSeats: 200,
    electoralNote: "Czechia uses proportional representation with a 5% threshold, using the Imperiali quota and D'Hondt method across 14 regions.",
    electionParties: [
      { id: 'ano', name: 'ANO', seats: 72, color: '#271B5A', euGroup: 'PfE' },
      { id: 'ods', name: 'ODS', seats: 34, color: '#0052A3', euGroup: 'ECR' },
      { id: 'stan', name: 'STAN', seats: 33, color: '#B3C800', euGroup: 'EPP' },
      { id: 'kdu', name: 'KDU-ČSL', seats: 23, color: '#FFD700', euGroup: 'EPP' },
      { id: 'spd', name: 'SPD', seats: 20, color: '#00BFFF', euGroup: 'ESN' },
      { id: 'top09', name: 'TOP 09', seats: 14, color: '#993366', euGroup: 'EPP' },
      { id: 'pirati', name: 'Piráti', seats: 4, color: '#000000', euGroup: 'Greens' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'ano', name: 'ANO', percentage: 33.0, color: '#271B5A', euGroup: 'PfE' },
      { id: 'ods', name: 'ODS', percentage: 14.0, color: '#0052A3', euGroup: 'ECR' },
      { id: 'pirati', name: 'Piráti', percentage: 10.0, color: '#000000', euGroup: 'Greens' },
      { id: 'spd', name: 'SPD', percentage: 9.0, color: '#00BFFF', euGroup: 'ESN' },
      { id: 'stan', name: 'STAN', percentage: 7.0, color: '#B3C800', euGroup: 'EPP' }
    ], 200, 5.0)
  },
  Hungary: {
    totalSeats: 199,
    electoralNote: "Hungary utilizes a mixed system heavily weighted towards majoritarianism. 106 seats are first-past-the-post, while 93 are proportional.",
    electionParties: [
      { id: 'fidesz', name: 'Fidesz-KDNP', seats: 135, color: '#FD8100', euGroup: 'PfE' },
      { id: 'united', name: 'United for Hungary', seats: 57, color: '#FF0000', euGroup: 'Mixed' },
      { id: 'mhm', name: 'Mi Hazánk', seats: 6, color: '#5D9731', euGroup: 'ESN' },
      { id: 'mno', name: 'MNOÖ', seats: 1, color: '#000000', euGroup: 'NI' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'fidesz', name: 'Fidesz', percentage: 45.0, projectedSeats: 120, color: '#FD8100', euGroup: 'PfE' },
      { id: 'tisza', name: 'Tisza', percentage: 30.0, projectedSeats: 60, color: '#0000FF', euGroup: 'EPP' },
      { id: 'dk', name: 'DK', percentage: 10.0, projectedSeats: 10, color: '#004A99', euGroup: 'S&D' },
      { id: 'mhm', name: 'Mi Hazánk', percentage: 6.0, projectedSeats: 9, color: '#5D9731', euGroup: 'ESN' }
    ], 199, 0)
  },
  Bulgaria: {
    totalSeats: 240,
    electoralNote: "Bulgaria uses proportional representation with a 4% threshold. Extreme electoral volatility has led to frequent snap elections.",
    electionParties: [
      { id: 'gerb', name: 'GERB-SDS', seats: 69, color: '#005A9C', euGroup: 'EPP' },
      { id: 'ppdb', name: 'PP-DB', seats: 64, color: '#FFD700', euGroup: 'Renew' },
      { id: 'revival', name: 'Revival', seats: 37, color: '#000000', euGroup: 'ESN' },
      { id: 'dps', name: 'DPS', seats: 36, color: '#004A99', euGroup: 'Renew' },
      { id: 'bsp', name: 'BSP', seats: 23, color: '#E3000F', euGroup: 'S&D' },
      { id: 'itn', name: 'ITN', seats: 11, color: '#00AEEF', euGroup: 'NI' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'gerb', name: 'GERB-SDS', percentage: 25.0, color: '#005A9C', euGroup: 'EPP' },
      { id: 'ppdb', name: 'PP-DB', percentage: 18.0, color: '#FFD700', euGroup: 'Renew' },
      { id: 'revival', name: 'Revival', percentage: 15.0, color: '#000000', euGroup: 'ESN' },
      { id: 'dps', name: 'DPS', percentage: 13.0, color: '#004A99', euGroup: 'Renew' },
      { id: 'bsp', name: 'BSP', percentage: 9.0, color: '#E3000F', euGroup: 'S&D' }
    ], 240, 4.0)
  },
  Slovakia: {
    totalSeats: 150,
    electoralNote: "Slovakia elects its 150-member National Council from a single nationwide constituency with a 5% threshold.",
    electionParties: [
      { id: 'smer', name: 'Smer-SD', seats: 42, color: '#D21A1A', euGroup: 'NI' },
      { id: 'ps', name: 'PS', seats: 32, color: '#00BFFF', euGroup: 'Renew' },
      { id: 'hlas', name: 'Hlas-SD', seats: 27, color: '#A10022', euGroup: 'NI' },
      { id: 'olano', name: 'OĽaNO', seats: 16, color: '#90C044', euGroup: 'EPP' },
      { id: 'kdh', name: 'KDH', seats: 12, color: '#0052A3', euGroup: 'EPP' },
      { id: 'sas', name: 'SaS', seats: 11, color: '#99CC33', euGroup: 'ECR' },
      { id: 'sns', name: 'SNS', seats: 10, color: '#003366', euGroup: 'ESN' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'smer', name: 'Smer-SD', percentage: 22.0, color: '#D21A1A', euGroup: 'NI' },
      { id: 'ps', name: 'PS', percentage: 20.0, color: '#00BFFF', euGroup: 'Renew' },
      { id: 'hlas', name: 'Hlas-SD', percentage: 15.0, color: '#A10022', euGroup: 'NI' },
      { id: 'kdh', name: 'KDH', percentage: 7.0, color: '#0052A3', euGroup: 'EPP' },
      { id: 'sns', name: 'SNS', percentage: 6.0, color: '#003366', euGroup: 'ESN' }
    ], 150, 5.0)
  },
  Finland: {
    totalSeats: 200,
    electoralNote: "Finland uses open-list proportional representation in 13 multi-member constituencies using the D'Hondt method without a formal threshold.",
    electionParties: [
      { id: 'kok', name: 'Kokoomus', seats: 48, color: '#006288', euGroup: 'EPP' },
      { id: 'ps', name: 'Perussuomalaiset', seats: 46, color: '#FFD700', euGroup: 'ECR' },
      { id: 'sdp', name: 'SDP', seats: 43, color: '#E11931', euGroup: 'S&D' },
      { id: 'kesk', name: 'Keskusta', seats: 23, color: '#01954B', euGroup: 'Renew' },
      { id: 'vihr', name: 'Vihreät', seats: 13, color: '#61BF1A', euGroup: 'Greens' },
      { id: 'vas', name: 'Vasemmistoliitto', seats: 11, color: '#BF0D3E', euGroup: 'Left' },
      { id: 'sfp', name: 'SFP', seats: 9, color: '#FFDD00', euGroup: 'Renew' },
      { id: 'kd', name: 'KD', seats: 5, color: '#18359B', euGroup: 'EPP' },
      { id: 'aland', name: 'Åland', seats: 1, color: '#0052A5', euGroup: 'Renew' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'sdp', name: 'SDP', percentage: 22.0, color: '#E11931', euGroup: 'S&D' },
      { id: 'kok', name: 'Kokoomus', percentage: 20.0, color: '#006288', euGroup: 'EPP' },
      { id: 'ps', name: 'Perussuomalaiset', percentage: 17.0, color: '#FFD700', euGroup: 'ECR' },
      { id: 'kesk', name: 'Keskusta', percentage: 11.0, color: '#01954B', euGroup: 'Renew' },
      { id: 'vas', name: 'Vasemmistoliitto', percentage: 9.0, color: '#BF0D3E', euGroup: 'Left' }
    ], 200, 2.0)
  },
  Croatia: {
    totalSeats: 151,
    electoralNote: "Croatia allocates 140 seats proportionally across 10 districts, 3 for the diaspora, and 8 strictly reserved for national minorities.",
    electionParties: [
      { id: 'hdz', name: 'HDZ', seats: 61, color: '#005BAA', euGroup: 'EPP' },
      { id: 'sdp', name: 'SDP', seats: 42, color: '#ED1C24', euGroup: 'S&D' },
      { id: 'dp', name: 'Domovinski Pokret', seats: 14, color: '#000000', euGroup: 'ESN' },
      { id: 'most', name: 'Most', seats: 11, color: '#F39200', euGroup: 'NI' },
      { id: 'mozemo', name: 'Možemo!', seats: 10, color: '#A3C83F', euGroup: 'Greens' },
      { id: 'ids', name: 'IDS', seats: 2, color: '#009933', euGroup: 'Renew' },
      { id: 'min', name: 'Minorities', seats: 8, color: '#808080', euGroup: 'Mixed' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'hdz', name: 'HDZ', percentage: 29.0, color: '#005BAA', euGroup: 'EPP' },
      { id: 'sdp', name: 'SDP', percentage: 24.0, color: '#ED1C24', euGroup: 'S&D' },
      { id: 'dp', name: 'DP', percentage: 9.0, color: '#000000', euGroup: 'ESN' },
      { id: 'mozemo', name: 'Možemo!', percentage: 8.0, color: '#A3C83F', euGroup: 'Greens' },
      { id: 'most', name: 'Most', percentage: 7.0, color: '#F39200', euGroup: 'NI' }
    ], 143, 5.0)
  },
  Lithuania: {
    totalSeats: 141,
    electoralNote: "Lithuania uses a parallel voting system. 71 members are elected in single-seat constituencies, while 70 are elected proportionally nationwide.",
    electionParties: [
      { id: 'tslkd', name: 'TS-LKD', seats: 50, color: '#005A9C', euGroup: 'EPP' },
      { id: 'lvzs', name: 'LVŽS', seats: 32, color: '#008000', euGroup: 'ECR' },
      { id: 'lsdp', name: 'LSDP', seats: 13, color: '#E3000F', euGroup: 'S&D' },
      { id: 'dsvl', name: 'DSVL', seats: 16, color: '#00AEEF', euGroup: 'Greens' },
      { id: 'lrls', name: 'LRLS', seats: 13, color: '#F4D03F', euGroup: 'Renew' },
      { id: 'lp', name: 'Laisvės Partija', seats: 11, color: '#E84188', euGroup: 'Renew' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'lsdp', name: 'LSDP', percentage: 20.0, projectedSeats: 40, color: '#E3000F', euGroup: 'S&D' },
      { id: 'tslkd', name: 'TS-LKD', percentage: 15.0, projectedSeats: 35, color: '#005A9C', euGroup: 'EPP' },
      { id: 'lvzs', name: 'LVŽS', percentage: 10.0, projectedSeats: 20, color: '#008000', euGroup: 'ECR' },
      { id: 'dsvl', name: 'DSVL', percentage: 9.0, projectedSeats: 15, color: '#00AEEF', euGroup: 'Greens' }
    ], 141, 0)
  },
  Slovenia: {
    totalSeats: 90,
    electoralNote: "Slovenia utilizes a 4% threshold for 88 proportional seats. 2 seats are strictly reserved for the Italian and Hungarian national minorities.",
    electionParties: [
      { id: 'gs', name: 'Gibanje Svoboda', seats: 41, color: '#00AEEF', euGroup: 'Renew' },
      { id: 'sds', name: 'SDS', seats: 27, color: '#F4D03F', euGroup: 'EPP' },
      { id: 'nsi', name: 'NSi', seats: 8, color: '#005A9C', euGroup: 'EPP' },
      { id: 'sd', name: 'SD', seats: 7, color: '#E3000F', euGroup: 'S&D' },
      { id: 'levica', name: 'Levica', seats: 5, color: '#8B0000', euGroup: 'Left' },
      { id: 'min', name: 'Minorities', seats: 2, color: '#808080', euGroup: 'NI' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'sds', name: 'SDS', percentage: 24.0, color: '#F4D03F', euGroup: 'EPP' },
      { id: 'gs', name: 'Gibanje Svoboda', percentage: 18.0, color: '#00AEEF', euGroup: 'Renew' },
      { id: 'sd', name: 'SD', percentage: 8.0, color: '#E3000F', euGroup: 'S&D' },
      { id: 'nsi', name: 'NSi', percentage: 6.0, color: '#005A9C', euGroup: 'EPP' }
    ], 88, 4.0)
  },
  Latvia: {
    totalSeats: 100,
    electoralNote: "The Saeima allocates 100 seats proportionally using the Sainte-Laguë method with a 5% threshold across five electoral districts.",
    electionParties: [
      { id: 'jv', name: 'Jaunā Vienotība', seats: 26, color: '#A3C83F', euGroup: 'EPP' },
      { id: 'zzs', name: 'ZZS', seats: 16, color: '#008000', euGroup: 'NI' },
      { id: 'as', name: 'Apvienotais Saraksts', seats: 15, color: '#005A9C', euGroup: 'NI' },
      { id: 'na', name: 'Nacionālā Apvienība', seats: 13, color: '#8B0000', euGroup: 'ECR' },
      { id: 'st', name: 'Stabilitātei!', seats: 11, color: '#E3000F', euGroup: 'NI' },
      { id: 'lpv', name: 'LPV', seats: 9, color: '#FFD700', euGroup: 'NI' },
      { id: 'pro', name: 'Progresīvie', seats: 10, color: '#E84188', euGroup: 'Greens' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'jv', name: 'Jaunā Vienotība', percentage: 18.0, color: '#A3C83F', euGroup: 'EPP' },
      { id: 'na', name: 'Nacionālā Apvienība', percentage: 14.0, color: '#8B0000', euGroup: 'ECR' },
      { id: 'zzs', name: 'ZZS', percentage: 11.0, color: '#008000', euGroup: 'NI' },
      { id: 'pro', name: 'Progresīvie', percentage: 9.0, color: '#E84188', euGroup: 'Greens' },
      { id: 'as', name: 'Apvienotais Saraksts', percentage: 8.0, color: '#005A9C', euGroup: 'NI' }
    ], 100, 5.0)
  },
  Estonia: {
    totalSeats: 101,
    electoralNote: "Estonia uses a complex three-tier proportional system: local mandates, district lists, and finally a national compensatory pool to ensure exact proportionality.",
    electionParties: [
      { id: 'ref', name: 'Reform Party', seats: 37, color: '#F4D03F', euGroup: 'Renew' },
      { id: 'ekre', name: 'EKRE', seats: 17, color: '#000000', euGroup: 'ID' },
      { id: 'kesk', name: 'Centre Party', seats: 16, color: '#008000', euGroup: 'Renew' },
      { id: 'e200', name: 'Eesti 200', seats: 14, color: '#00AEEF', euGroup: 'Renew' },
      { id: 'sde', name: 'SDE', seats: 9, color: '#E3000F', euGroup: 'S&D' },
      { id: 'isamaa', name: 'Isamaa', seats: 8, color: '#005A9C', euGroup: 'EPP' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'isamaa', name: 'Isamaa', percentage: 26.0, color: '#005A9C', euGroup: 'EPP' },
      { id: 'ref', name: 'Reform Party', percentage: 18.0, color: '#F4D03F', euGroup: 'Renew' },
      { id: 'ekre', name: 'EKRE', percentage: 15.0, color: '#000000', euGroup: 'ID' },
      { id: 'sde', name: 'SDE', percentage: 14.0, color: '#E3000F', euGroup: 'S&D' }
    ], 101, 5.0)
  },
  Cyprus: {
    totalSeats: 56,
    electoralNote: "The House of Representatives allocates 56 seats proportionally. Cyprus is guaranteed a minimum of 6 MEPs in the European Parliament due to degressive proportionality.",
    electionParties: [
      { id: 'disy', name: 'DISY', seats: 17, color: '#005A9C', euGroup: 'EPP' },
      { id: 'akel', name: 'AKEL', seats: 15, color: '#E3000F', euGroup: 'Left' },
      { id: 'diko', name: 'DIKO', seats: 9, color: '#005A9C', euGroup: 'S&D' },
      { id: 'elam', name: 'ELAM', seats: 4, color: '#000000', euGroup: 'ECR' },
      { id: 'edek', name: 'EDEK', seats: 4, color: '#8B0000', euGroup: 'S&D' },
      { id: 'dipa', name: 'DIPA', seats: 4, color: '#F4D03F', euGroup: 'Renew' },
      { id: 'greens', name: 'KOSP', seats: 3, color: '#008000', euGroup: 'Greens' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'disy', name: 'DISY', percentage: 25.0, color: '#005A9C', euGroup: 'EPP' },
      { id: 'akel', name: 'AKEL', percentage: 23.0, color: '#E3000F', euGroup: 'Left' },
      { id: 'diko', name: 'DIKO', percentage: 11.0, color: '#005A9C', euGroup: 'S&D' },
      { id: 'elam', name: 'ELAM', percentage: 10.0, color: '#000000', euGroup: 'ECR' }
    ], 56, 3.6)
  },
  Luxembourg: {
    totalSeats: 60,
    electoralNote: "Voters can utilize 'panachage' (cross-voting for individual candidates across different party lists) to distribute 60 seats across 4 regions.",
    electionParties: [
      { id: 'csv', name: 'CSV', seats: 21, color: '#F4D03F', euGroup: 'EPP' },
      { id: 'dp', name: 'DP', seats: 14, color: '#005A9C', euGroup: 'Renew' },
      { id: 'lsap', name: 'LSAP', seats: 11, color: '#E3000F', euGroup: 'S&D' },
      { id: 'adr', name: 'ADR', seats: 5, color: '#005A9C', euGroup: 'ECR' },
      { id: 'greng', name: 'Déi Gréng', seats: 4, color: '#008000', euGroup: 'Greens' },
      { id: 'piraten', name: 'Piraten', seats: 3, color: '#800080', euGroup: 'Greens' },
      { id: 'lenk', name: 'Déi Lénk', seats: 2, color: '#8B0000', euGroup: 'Left' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'csv', name: 'CSV', percentage: 27.0, color: '#F4D03F', euGroup: 'EPP' },
      { id: 'lsap', name: 'LSAP', percentage: 19.0, color: '#E3000F', euGroup: 'S&D' },
      { id: 'dp', name: 'DP', percentage: 16.0, color: '#005A9C', euGroup: 'Renew' },
      { id: 'adr', name: 'ADR', percentage: 10.0, color: '#005A9C', euGroup: 'ECR' }
    ], 60, 0)
  },
  Malta: {
    totalSeats: 65,
    electoralNote: "Malta uses STV. While normally 65 seats, extra mandates are often added to ensure the party with the most votes has a strict parliamentary majority. Malta is guaranteed a minimum of 6 MEPs in the European Parliament.",
    electionParties: [
      { id: 'pl', name: 'Labour Party', seats: 44, color: '#E3000F', euGroup: 'S&D' },
      { id: 'pn', name: 'Nationalist Party', seats: 35, color: '#005A9C', euGroup: 'EPP' }
    ],
    pollParties: calculateDHondtSeats([
      { id: 'pl', name: 'Labour Party', percentage: 51.0, projectedSeats: 40, color: '#E3000F', euGroup: 'S&D' },
      { id: 'pn', name: 'Nationalist Party', percentage: 46.0, projectedSeats: 35, color: '#005A9C', euGroup: 'EPP' }
    ], 79, 0)
  }
};