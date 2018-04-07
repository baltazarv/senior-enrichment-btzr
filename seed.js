const faker = require('faker');

const schools = [
  { name: 'Hogwarts School of Witchcraft and Wizardry', imageurl: '/images/schools/school-1.jpeg', description: '' },
  { name: 'Williams College', imageurl: '/images/schools/school-2.jpeg', description: '' },
  { name: 'Glenbrook North High School', imageurl: '/images/schools/school-3.jpeg', description: '' },
  { name: 'Westerburg High School', imageurl: '/images/schools/school-4.jpeg', description: '' },
  { name: 'Rydell High School', imageurl: '/images/schools/school-5.jpeg', description: '' }
];

const students = [
  { firstname: 'Harry', lastname: 'Potter', email: 'harry@potter.com', gpa: 3.8 },
  { firstname: 'Benjamin', lastname: 'Braddock', email: 'ben@braddock.com', gpa: 3.0 },
  { firstname: 'Ferris', lastname: 'Bueller', email: 'ferris@bueller.com', gpa: 3.1 },
  { firstname: 'Veronica', lastname: 'Sawyer', email: 'veronica@sawyer.com', gpa: 3.8 },
  { firstname: 'Heather', lastname: 'Chandler', email: 'heather@chandler.com', gpa: 2.2 },
  { firstname: 'Heather', lastname: 'Duke', email: 'heather@duke.com', gpa: 1.8 },
  { firstname: 'Heather', lastname: 'McNamara', email: 'heather@mcnamara.com', gpa: 1.5 },
  { firstname: 'Romy', lastname: 'White', email: 'romy@white.com', gpa: 2.4 },
  { firstname: 'Michele', lastname: 'Weinberger', email: 'michele@weinberger.com', gpa: 2.6 },
  { firstname: 'Danny', lastname: 'Zuko', email: 'danny@zuko.com', gpa: 1.0 },
  { firstname: 'Sandy', lastname: 'Olsson', email: 'sandy@olsson.com', gpa: 3.9 }
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
