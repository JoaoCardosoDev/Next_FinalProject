import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // First, let's create a test user if it doesn't exist
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      emailVerified: new Date(),
    },
  })

  // Create 7 shower thoughts
  const showerThoughts = [
    {
      title: "The Paradox of Time",
      body: "If time is relative, does that mean procrastination is technically a form of time travel?",
      published: true,
      createdById: testUser.id,
    },
    {
      title: "Digital Footprints",
      body: "Every time we delete something from our devices, we're creating more data about deleting data.",
      published: true,
      createdById: testUser.id,
    },
    {
      title: "Language Evolution",
      body: "If we could speak to our ancestors from 1000 years ago, would they understand our modern slang, or would we sound like aliens to them?",
      published: true,
      createdById: testUser.id,
    },
    {
      title: "Dream Logic",
      body: "In dreams, we accept impossible scenarios as normal, but when we wake up, we question the logic of a talking cat wearing a business suit.",
      published: true,
      createdById: testUser.id,
    },
    {
      title: "Memory vs Reality",
      body: "Every time we remember something, we're actually remembering the last time we remembered it, not the original event.",
      published: true,
      createdById: testUser.id,
    },
    {
      title: "The Internet's Physical Form",
      body: "If the internet had a physical form, would it be a single massive structure, or would it be scattered across the planet like a digital nervous system?",
      published: true,
      createdById: testUser.id,
    },
    {
      title: "Silence in Space",
      body: "In space, no one can hear you scream, but they can see you if you're close enough. So technically, space is more like a silent movie than complete isolation.",
      published: true,
      createdById: testUser.id,
    },
  ]

  // Insert all shower thoughts
  for (const thought of showerThoughts) {
    await prisma.post.create({
      data: thought,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 