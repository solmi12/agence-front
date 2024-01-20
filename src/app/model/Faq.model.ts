export class Faq {
    constructor(
   public faqId: number  | null = null,
    public titleFaq: string,
    public descriptionFaq: string,
    public categoriefaq: string,

   public showDescription: boolean = false 
   ){}
  }
  