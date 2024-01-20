export class Kontakt {
    constructor(
     public kontaktId: number | null = null,
      public title: string,
      public numTlp: string,
      public mail: string,
      public nachname: string,
      public description: string,
      public isShow: boolean
    ) {}
  }
  