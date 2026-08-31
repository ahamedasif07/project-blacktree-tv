import { connectDB } from "@/lib/db";
import Actor from "@/models/actor.model";

export const initialActors = [
  {
    slug: "denzel-washington",
    name: "Denzel Washington",
    role: "American Actor & Filmmaker",
    label: "Featured Talent",
    shortDesc: "A multi-Academy Award winning titan of modern cinema, renowned for iconic performances in 'Training Day', 'Fences', and 'Gladiator II'.",
    bio: [
      "Denzel Hayes Washington Jr. is an American actor, producer, and director. In a career spanning over four decades, Washington has received numerous accolades, including two Academy Awards, a Tony Award, and three Golden Globe Awards.",
      "He is widely regarded as one of the greatest actors of his generation, known for his ability to embody complex characters with dignity, immense gravity, and intense emotional depth.",
    ],
    details: {
      born: "December 28, 1954 • Mount Vernon, NY",
      awards: "2 Academy Awards, 3 Golden Globes, 1 Tony",
      training: "Fordham University, American Conservatory Theater",
    },
    image: "/assets/images/Denzel.png",
    isFeatured: true,
  },
  {
    slug: "angelina-jolie",
    name: "Angelina Jolie",
    role: "American Actress & Director",
    label: "Featured Talent",
    shortDesc: "Academy Award-winning actress celebrated for versatile cinematic roles ranging from 'Girl, Interrupted' to 'Maleficent' and 'Maria'.",
    bio: [
      "Angelina Jolie is an American actress, filmmaker, and humanitarian. The recipient of numerous accolades, including an Academy Award and three Golden Globe Awards, she has been named Hollywood's highest-paid actress multiple times.",
      "Beyond her cinematic achievements, she is noted for her extensive humanitarian efforts, for which she has received a Jean Hersholt Humanitarian Award.",
    ],
    details: {
      born: "June 4, 1975 • Los Angeles, CA",
      awards: "1 Academy Award, 3 Golden Globes, 2 SAG Awards",
      training: "Lee Strasberg Theatre and Film Institute",
    },
    image: "/assets/images/Angelina.png",
    isFeatured: true,
  },
  {
    slug: "tom-hanks",
    name: "Tom Hanks",
    role: "American Actor & Producer",
    label: "Featured Talent",
    shortDesc: "Beloved worldwide for legendary roles in 'Forrest Gump', 'Cast Away', 'Saving Private Ryan', and 'Apollo 13'.",
    bio: [
      "Thomas Jeffrey Hanks is an American actor and filmmaker. Known for both his comedic and dramatic roles, he is one of the most popular and recognizable film stars worldwide.",
      "Hanks is the recipient of several honors, including back-to-back Academy Awards for Best Actor, the Presidential Medal of Freedom, and the Cecil B. DeMille Award.",
    ],
    details: {
      born: "July 9, 1956 • Concord, CA",
      awards: "2 Academy Awards, 4 Golden Globes, 7 Emmy Awards",
      training: "California State University, Sacramento",
    },
    image: "/assets/images/tom-hanks.jpg",
    isFeatured: true,
  },
  {
    slug: "jennifer-aniston",
    name: "Jennifer Aniston",
    role: "American Actress & Producer",
    label: "Featured Talent",
    shortDesc: "Emmy and Golden Globe winner celebrated for 'Friends', 'The Morning Show', and a successful roster of acclaimed feature films.",
    bio: [
      "Jennifer Joanna Aniston rose to international fame for her role as Rachel Green on the television sitcom Friends, for which she earned Primetime Emmy, Golden Globe, and Screen Actors Guild awards.",
      "She continues to captivate global audiences with critically acclaimed dramatic roles including her lead performance in Apple TV's The Morning Show.",
    ],
    details: {
      born: "February 11, 1969 • Los Angeles, CA",
      awards: "1 Emmy Award, 1 Golden Globe, 1 SAG Award",
      training: "Fiorello H. LaGuardia High School of Music & Art",
    },
    image: "/assets/images/Jennifer.png",
    isFeatured: true,
  },
  {
    slug: "al-pacino",
    name: "Al Pacino",
    role: "American Actor & Filmmaker",
    label: "Featured Talent",
    shortDesc: "Cinematic icon famed for 'The Godfather' trilogy, 'Scarface', 'Heat', and 'Scent of a Woman'. Triple Crown of Acting recipient.",
    bio: [
      "Alfredo James Pacino is an American actor. Considered one of the most influential actors of the 20th century, he has received numerous accolades including an Academy Award, two Tony Awards, and two Primetime Emmy Awards.",
      "His career has spanned over five decades, and he remains one of the few performers to have achieved the 'Triple Crown of Acting' in the United States.",
    ],
    details: {
      born: "April 25, 1940 • New York City, NY",
      awards: "1 Academy Award, 2 Tonys, 2 Emmys, 4 Golden Globes",
      training: "HB Studio, The Actors Studio",
    },
    image: "/assets/images/Pacino.png",
    isFeatured: true,
  },
  {
    slug: "cillian-murphy",
    name: "Cillian Murphy",
    role: "Irish Actor",
    label: "Featured Talent",
    shortDesc: "Academy Award winner for 'Oppenheimer' and world-renowned as Thomas Shelby in the global cultural sensation 'Peaky Blinders'.",
    bio: [
      "Cillian Murphy is an Irish actor who achieved international acclaim for his collaborations with director Christopher Nolan and his role as Tommy Shelby.",
      "In 2024, Murphy won the Academy Award for Best Actor for his commanding titular performance in Oppenheimer.",
    ],
    details: {
      born: "May 25, 1976 • Douglas, Cork, Ireland",
      awards: "1 Academy Award, 1 BAFTA, 1 Golden Globe, 1 SAG Award",
      training: "Corcadorca Theatre Company, UCC",
    },
    image: "/assets/images/cillian-murphy.jpg",
    isFeatured: true,
  },
  {
    slug: "zendaya",
    name: "Zendaya",
    role: "American Actress & Singer",
    label: "Featured Talent",
    shortDesc: "Two-time Emmy Award winner recognized for leading roles in 'Dune: Part One & Two', 'Euphoria', 'Challengers', and 'Spider-Man'.",
    bio: [
      "Zendaya Maree Stoermer Coleman is an American actress and singer who has received multiple accolades including two Primetime Emmy Awards and a Golden Globe Award.",
      "She has established herself as one of the most prominent leading actors in global cinema with box office sensations such as Dune and Challengers.",
    ],
    details: {
      born: "September 1, 1996 • Oakland, CA",
      awards: "2 Primetime Emmy Awards, 1 Golden Globe",
      training: "American Conservatory Theater, Oakland School for the Arts",
    },
    image: "/assets/images/zendaya.jpg",
    isFeatured: true,
  },
  {
    slug: "leonardo-dicaprio",
    name: "Leonardo DiCaprio",
    role: "American Actor & Producer",
    label: "Featured Talent",
    shortDesc: "Academy Award winner celebrated for masterpieces including 'Inception', 'Titanic', 'The Wolf of Wall Street', and 'The Revenant'.",
    bio: [
      "Leonardo Wilhelm DiCaprio is an American actor and film producer. Known for his work in biopics and period films, he has received numerous accolades, including an Academy Award, a British Academy Film Award, and three Golden Globe Awards.",
      "His films have grossed over $7.2 billion worldwide, placing him among the highest-earning actors in cinema history.",
    ],
    details: {
      born: "November 11, 1974 • Los Angeles, CA",
      awards: "1 Academy Award, 1 BAFTA, 3 Golden Globes",
      training: "Los Angeles Center for Enriched Studies",
    },
    image: "/assets/images/leonardo-dicaprio.jpg",
    isFeatured: true,
  },
];

export async function seedActors() {
  await connectDB();
  console.log("Connecting to MongoDB to seed Actors...");

  // Clean old actors collection and insert fresh
  await Actor.deleteMany({});
  console.log("Cleared old actors collection.");

  const inserted = await Actor.insertMany(initialActors);
  console.log(`🌟 Successfully seeded ${inserted.length} actors with pure MongoDB _id:`);
  inserted.forEach((a) => {
    console.log(`   - ${a.name} (${a.slug}) (ObjectId: ${a._id})`);
  });

  return inserted;
}

// Allow direct script execution: bun scripts/actors/seed-actors.ts
if (require.main === module) {
  seedActors()
    .then(() => {
      console.log("🎉 Actors seed finished.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ Failed to seed actors:", err);
      process.exit(1);
    });
}
