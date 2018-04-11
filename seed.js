const faker = require('faker');

const schools = [
  { name: 'Hogwarts School of Witchcraft and Wizardry', imageurl: '/images/schools/school-1.jpeg', description: '' },
  { name: 'Williams College', imageurl: '/images/schools/school-2.jpeg', description: '' },
  { name: 'Glenbrook North High School', imageurl: '/images/schools/school-3.jpeg', description: '' },
  { name: 'Westerburg High School', imageurl: '/images/schools/school-4.jpeg', description: '' },
  { name: 'Rydell High School', imageurl: '/images/schools/school-5.jpeg', description: '' }
];

const students = [
  { firstname: 'Harry', lastname: 'Potter', email: 'harry@potter.com', gpa: 3.8, imageurl: 'https://intouch.wunderweib.de/assets/styles/600x600/public/field/image/harry-potter.jpg' },
  { firstname: 'Benjamin', lastname: 'Braddock', email: 'ben@braddock.com', gpa: 3.0, imageurl: 'https://www.movieposter.com/posters/archive/main/161/MPW-80546' },
  { firstname: 'Ferris', lastname: 'Bueller', email: 'ferris@bueller.com', gpa: 3.1, imageurl: 'https://bestofthe80s.files.wordpress.com/2010/04/ferris-bueller-p02.jpg' },
  { firstname: 'Veronica', lastname: 'Sawyer', email: 'veronica@sawyer.com', gpa: 3.8, imageurl: 'https://78.media.tumblr.com/f171347c6058c5b42107ad344bfcee00/tumblr_ojt7myMFHV1vdenmjo1_400.png' },
  { firstname: 'Heather', lastname: 'Chandler', email: 'heather@chandler.com', gpa: 2.2, imageurl: 'http://carygrantwonteatyou.com/wp-content/uploads/2015/03/HeatherChandler.jpg' },
  { firstname: 'Heather', lastname: 'Duke', email: 'heather@duke.com', gpa: 1.8 },
  { firstname: 'Heather', lastname: 'McNamara', email: 'heather@mcnamara.com', gpa: 1.5 },
  { firstname: 'Romy', lastname: 'White', email: 'romy@white.com', gpa: 2.4, imageurl: 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/p-romy-and-micheles-high-school-reunion-mira-sorvino.jpg' },
  { firstname: 'Michele', lastname: 'Weinberger', email: 'michele@weinberger.com', gpa: 2.6, imageurl: 'https://thumbs.gfycat.com/WigglyAccomplishedGossamerwingedbutterfly-max-1mb.gif' },
  { firstname: 'Danny', lastname: 'Zuko', email: 'danny@zuko.com', gpa: 1.0, imageurl: 'https://g.rrrather.com/img/q/91241a.jpg' },
  { firstname: 'Sandy', lastname: 'Olsson', email: 'sandy@olsson.com', gpa: 3.9, imageurl: 'https://vignette.wikia.nocookie.net/grease/images/3/37/Sandy-grease-2.jpeg/revision/latest?cb=20121226055242' }
];

const getSchools = () => {
  schools.forEach(school => {
    let paragraphs = '';
    const randoNumPara = Math.ceil(Math.random() * 4);
    for (var i = 1; i <= randoNumPara; i++) {
      const newLorem = faker.lorem.paragraph();
      paragraphs += newLorem; //`${newLorem}\n\n`;
    }
    school.description = paragraphs;
    school.address1 = faker.address.streetAddress();
    school.address2 = faker.address.city() + ', ' + faker.address.state() + ' ' + faker.address.zipCode();
  });
  return schools;
};

const getStudents = () => {
  return students;
};

module.exports = {
  getStudents,
  getSchools
};
