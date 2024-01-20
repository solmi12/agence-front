export enum HajCategorie {
  UMRA = 'umra',
  HAJJ = 'hajj',
  OTHER = 'other'
  // Add more categories as needed
}

export class Haj{

   
  constructor(
    public hajId: number | null | undefined,
    public priceVen : number,
       public hajName: string,
       public offre1: string,
       public  typeRoom : string,
       public offre2: string,
       public offre3: string,
       public offre4: string,
       public offre5: string,
       public offre6: string,
       public offre7: string,
       public offre8: string,
       public offre9: string,
       public priceAd:number,
       public offre10: string,
       public nbrDays : string,
      
       public hajDescription: string,
       public departureAirport: string,
       public distanceMakka: string,
       public retrnAirport: string,
       public distanceMadina: string,
       public going: string,
       public showNow: boolean,
        public imageData: File | null = null,
       public reservationNumber:number,
       public numb : number,
       public coming: string,
       public airline: string,
       public price: string,
       public airfare: boolean,
       public localTransportation: boolean,
       public tourGuide: boolean,
       public accommodation: boolean,
       public entranceFees : boolean,
       public lunch : boolean,
       public dinner : boolean,
       public guideGratuity: boolean,
       public hajDescription2 : string,
       public hajCategorie: HajCategorie, 
 
     ) {}  
}