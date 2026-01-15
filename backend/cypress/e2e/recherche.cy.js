describe('Tests API - Recherche avancée', () => {

  // Cas valide : recherche par Type 
  const typesATester = ['Eau', 'Feu', 'Plante', 'Électrik'];
  typesATester.forEach((typeRechercher) => {

    it(`doit filtrer les pokémons pour le type : ${typeRechercher}`, () => {
      cy.request({
        method: 'GET',
        url: `/api/pokemon?type=${typeRechercher}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.results).to.be.an('array');
        // On vérifie que le tableau n'est pas vide
        expect(response.body.results.length).to.be.greaterThan(0);
        // Vérification dynamique pour chaque Pokémon
        response.body.results.forEach((pokemon) => {
          expect(pokemon.types).to.include(typeRechercher);
        });
      });
    });
  });

  // Cas valide : recherche par Faiblesse
  it('doit filtrer les pokémons par faiblesse "combat"', () => {
    cy.request({
      method: 'GET',
      url: '/api/pokemon?weakness=Combat',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.count).to.be.equal(10);
      expect(response.body.results).to.be.an('array');
      response.body.results.forEach((pokemon) => {
        expect(pokemon.weaknesses).to.include('Combat');
      });
    });
  });

  // Cas valide : recherche par Type feu + faiblesse eau
  it('doit filtrer les pokémons par type "feu" et par faiblesse "eau"', () => {
    cy.request({
      method: 'GET',
      url: '/api/pokemon?type=Feu&weakness=Eau',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results).to.be.an('array');
      expect(response.body.count).to.be.equal(4);
      // on vérifie que chaque pokémon a bien le type feu et faiblesse eau
      response.body.results.forEach((pokemon) => {
        expect(pokemon.types).to.include('Feu');
        expect(pokemon.weaknesses).to.include('Eau');
      });
    });
  });


  //Cas invalide : type qui n'existe pas dans la recherche
  it('ne doit retourner aucun résultat pour type inexistant', () => {

    const typeRechercher = 'toto'
    //vérifie que le param n'est pas dans la liste des types
    cy.request({
      method: 'GET',
      url: '/api/types',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.not.include(typeRechercher);
    });

    //vérifie que le param typeREchercher n'affiche aucun resultat
    cy.request({
      method: 'GET',
      url: `/api/pokemon?type=${typeRechercher}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results).to.be.an('array').and.to.have.length(0);
      expect(response.body.count).to.be.equal(0);

    });

  });

  //Cas invalide : faiblesse inexistante dans la bdd
  it('ne doit retourner aucun résultat pour faiblesse inexistante', () => {

    const faiblesseRechercher = 'tata'
    //vérifie que le param n'est pas dans la liste des faiblesses
    cy.request({
      method: 'GET',
      url: '/api/weaknesses',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.not.include(faiblesseRechercher);

    });
    //vérifie que le param faiblesseRechercher n'affiche aucun resultat
    cy.request({
      method: 'GET',
      url: `/api/pokemon?weakness=${faiblesseRechercher}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results).to.be.an('array').and.to.have.length(0);
      expect(response.body.count).to.be.equal(0);

    });
  });

  //Cas invalide : recherche multicritères par type acier et faiblesse acier
  it('ne doit retourner aucun résultat pour 1 type et 1 faiblesse sélectionnés', () => {

    cy.request({
      method: 'GET',
      url: '/api/pokemon?type=Acier&weakness=Acier',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results).to.be.an('array').and.to.have.length(0);
      expect(response.body.count).to.be.equal(0);

    });
  });



  //Cas invalide : type et faiblesse qui n'existent pas
  it('ne doit retourner aucun résultat pour type et faiblesse inexistants', () => {
    cy.request({
      method: 'GET',
      url: '/api/pokemon?type=titi&weakness=tata',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results).to.be.an('array').and.to.have.length(0);
      expect(response.body.count).to.be.equal(0);

    });
  });

  // Cas invalide : type valide et faiblesse inexistante
  it('ne doit retourner aucun résultat pour type valide et faiblesse inexistante', () => {
    cy.request({
      method: 'GET',
      url: '/api/pokemon?type=Feu&weakness=tata',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results).to.be.an('array').and.to.have.length(0);
      expect(response.body.count).to.be.equal(0);

    });
  });

  // Cas invalide : type inexistant et faiblesse valide
  it('ne doit retourner aucun résultat pour faiblesse inexistante et type valide', () => {
    cy.request({
      method: 'GET',
      url: '/api/pokemon?type=bibi&weakness=Eau',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results).to.be.an('array').and.to.have.length(0);
      expect(response.body.count).to.be.equal(0);

    });
  });

});
