import type { PromptProps, ResponseProps, PromptResponseProps, TemperatureResponsesProps } from "../types/promptTypes";

const defaultPrompts: PromptProps[] = [
  {
    id: "1",
    prompt: "Write a short story about a robot learning to paint"
  },
  {
    id: "2",
    prompt: "Create a poem about the changing seasons"
  },
  {
    id: "3",
    prompt: "Describe a futuristic city where everyone can fly"
  },
  {
    id: "4",
    prompt: "Write a dialogue between a cat and a dog discussing their day"
  },
  {
    id: "5",
    prompt: "Create a recipe for a magical dessert that changes color"
  }
]


const defaultResponses: ResponseProps[] =
[
  {
    id: "1",
    response: "A metallic hand carefully dips a brush into vibrant paint...",
    promptID: "1"
  },
  {
    id: "2", 
    response: "Golden leaves dance in autumn's breeze...",
    promptID: "2"
  },
  {
    id: "3",
    response: "Skyscrapers pierce the clouds as citizens soar between buildings...",
    promptID: "3"
  },
  {
    id: "4",
    response: "The cat stretches lazily and says, 'I spent the day napping in the sun...'",
    promptID: "4"
  },
  {
    id: "5",
    response: "Mix stardust with rainbow sugar and moonlight essence...",
    promptID: "5"
  }
]

const temperatureResponses: TemperatureResponsesProps[] = [
  {
    promptID: "1",
    responses: [
      {
        id: '1',
        temperature: 0.0,
        response: 'A robot arm extends toward a canvas, its metallic fingers gripping a paintbrush with precise movements. The brush dips into a palette of primary colors, and the robot begins to paint with methodical, calculated strokes. Each movement is deliberate and predictable, creating geometric patterns with mathematical precision.'
      },
      {
        id: '2',
        temperature: 0.25,
        response: 'A robot arm reaches for a paintbrush, its movements slightly varied but still controlled. The brush touches the canvas, and the robot paints with mostly structured strokes, occasionally adding small flourishes. The result is a recognizable image with some artistic interpretation.'
      },
      {
        id: '3',
        temperature: 0.5,
        response: 'A robot arm grasps a paintbrush with moderate confidence, its movements showing both precision and creativity. The brush dances across the canvas, creating a mix of structured elements and expressive details. The painting emerges as a balanced composition with both technical skill and artistic flair.'
      },
      {
        id: '4',
        temperature: 0.75,
        response: 'A robot arm enthusiastically grabs a paintbrush, its movements becoming more fluid and unpredictable. The brush sweeps across the canvas with increasing energy, creating bold strokes and unexpected color combinations. The painting takes on a more expressive, impressionistic quality.'
      },
      {
        id: '5',
        temperature: 1.0,
        response: 'A robot arm wildly flails toward the paintbrush, movements erratic and chaotic. The brush splatters paint in all directions, creating abstract explosions of color. The canvas becomes a whirlwind of random strokes, splashes, and unpredictable patterns that defy conventional artistic structure.'
      }      
    ]
  },
  {
    promptID: "2",
    responses: [
      {
        id: '6',
        temperature: 0.0,
        response: 'Spring brings new leaves. Summer brings warm days. Autumn brings falling leaves. Winter brings cold snow. The cycle repeats each year with predictable patterns.'
      },
      {
        id: '7',
        temperature: 0.25,
        response: 'Spring awakens with gentle green buds. Summer radiates golden warmth across fields. Autumn paints the trees in amber and crimson. Winter blankets the earth in crystalline white. Nature follows its eternal rhythm.'
      },
      {
        id: '8',
        temperature: 0.5,
        response: 'Spring whispers life into dormant branches, summer dances with golden light, autumn weaves tapestries of fire and gold, winter dreams in silver silence. Each season tells its own story in the grand cycle of time.'
      },
      {
        id: '9',
        temperature: 0.75,
        response: 'Spring bursts forth like a symphony of emerald dreams, summer blazes with molten honey and sapphire skies, autumn explodes in a carnival of copper and garnet, winter slumbers beneath diamond dust and moonlit shadows.'
      },
      {
        id: '10',
        temperature: 1.0,
        response: 'Spring erupts in a cosmic explosion of chlorophyll fireworks, summer becomes a psychedelic fever dream of ultraviolet radiation, autumn transforms into a quantum vortex of temporal paradoxes, winter collapses into a singularity of crystalline entropy.'
      }      
    ]
  },
  {
    promptID: "3",
    responses: [
      {
        id: '11',
        temperature: 0.0,
        response: 'A city with tall buildings. People use flying devices to travel between buildings. The city has roads and transportation systems. Buildings are made of concrete and steel. The city functions efficiently.'
      },
      {
        id: '12',
        temperature: 0.25,
        response: 'A modern cityscape with skyscrapers reaching toward the clouds. Citizens glide between buildings using personal flight devices. The city maintains traditional infrastructure while incorporating aerial transportation networks.'
      },
      {
        id: '13',
        temperature: 0.5,
        response: 'A futuristic metropolis where glass and steel towers pierce the heavens. People soar gracefully between buildings using compact flight units, creating a three-dimensional traffic system. The city blends advanced technology with urban planning.'
      },
      {
        id: '14',
        temperature: 0.75,
        response: 'A dazzling city of crystalline spires and floating platforms, where citizens dance through the air on wings of light and energy. Buildings defy gravity with impossible architecture, and the sky is alive with the graceful ballet of human flight.'
      },
      {
        id: '15',
        temperature: 1.0,
        response: 'A reality-bending city where buildings phase in and out of existence, citizens teleport through quantum wormholes, and gravity is merely a suggestion. The sky is a kaleidoscope of impossible physics, where people fly by thinking about it hard enough.'
      }      
    ]
  },
  {
    promptID: "4",
    responses: [
      {
        id: '16',
        temperature: 0.0,
        response: 'Cat: "I slept today." Dog: "I played today." Cat: "I ate food." Dog: "I also ate food." Cat: "Goodbye." Dog: "Goodbye."'
      },
      {
        id: '17',
        temperature: 0.25,
        response: 'Cat: "I spent the day napping in the sun." Dog: "I played fetch in the park." Cat: "That sounds tiring." Dog: "It was fun!" Cat: "I prefer resting." Dog: "To each their own."'
      },
      {
        id: '18',
        temperature: 0.5,
        response: 'Cat: "I lounged in the window, watching birds and napping occasionally." Dog: "I chased squirrels and played with my favorite ball!" Cat: "How exhausting. I much prefer my peaceful observation." Dog: "But the excitement is wonderful!"'
      },
      {
        id: '19',
        temperature: 0.75,
        response: 'Cat: "I performed my daily meditation in the sunbeam, contemplating the mysteries of the universe while birds serenaded me." Dog: "I had the most AMAZING adventure! I discovered a new stick, met three other dogs, and found a secret tunnel!" Cat: "Your enthusiasm is... overwhelming."'
      },
      {
        id: '20',
        temperature: 1.0,
        response: 'Cat: "I transcended physical form and communed with the ancient feline spirits while floating in a quantum superposition of consciousness." Dog: "I BECAME THE STICK! The stick BECAME ME! We danced through dimensions and discovered that love is just a four-letter word for infinite joy!"'
      }      
    ]
  },
  {
    promptID: "5",
    responses: [
      {
        id: '21',
        temperature: 0.0,
        response: 'Mix 2 cups flour, 1 cup sugar, 3 eggs, and food coloring. Bake at 350°F for 30 minutes. The cake will change color when exposed to light due to the food coloring.'
      },
      {
        id: '22',
        temperature: 0.25,
        response: 'Combine 2 cups flour, 1 cup sugar, 3 eggs, and natural color-changing ingredients like butterfly pea flower. Bake at 350°F for 30 minutes. The dessert will shift from blue to purple when served with citrus.'
      },
      {
        id: '23',
        temperature: 0.5,
        response: 'Blend 2 cups flour, 1 cup sugar, 3 eggs, and a mixture of natural color-changing extracts. Add a pinch of culinary alchemy powder. Bake at 350°F for 30 minutes. The dessert transforms colors based on temperature and acidity.'
      },
      {
        id: '24',
        temperature: 0.75,
        response: 'Whisk together moonbeam flour, stardust sugar, and rainbow eggs. Add a dash of aurora borealis essence and a sprinkle of prismatic crystals. Bake under a full moon for 30 minutes. The dessert creates its own light show as it changes colors.'
      },
      {
        id: '25',
        temperature: 1.0,
        response: 'Harvest quantum flour from parallel universes, crystallize dreams into sugar, and capture the essence of a supernova in egg form. Add a pinch of reality-bending spice and bake in a dimensional oven. The dessert exists in multiple color states simultaneously until observed.'
      }      
    ]
  }
]

const getPromptsResponses = () => {
  return {
    prompts: defaultPrompts,
    responses: defaultResponses
  }
}

// Get the temperatures and responses for a specific promptID, using temperatures as prompts
export const getTemperaturePromptResponses = (promptID: string) => {
  const promptResponses = temperatureResponses.find(p => p.promptID === promptID);
  
  if (!promptResponses) {
    return {
      prompts: [],
      responses: []
    };
  }

  // Create prompts from temperature values
  const temperaturePrompts = promptResponses.responses.map(response => ({
    id: response.id,
    prompt: `Temperature: ${response.temperature}`
  }));

  // Create responses from the actual response text
  const responseData = promptResponses.responses.map(response => ({
    id: response.id,
    response: response.response,
    promptID: response.id // Link to the temperature prompt
  }));

  return {
    prompts: temperaturePrompts,
    responses: responseData
  };
};

const shufflePrompts = (prompts: PromptProps[]) => {
  const shuffledPrompts = [...prompts].sort(() => Math.random() - 0.5);
  return shuffledPrompts;
}

const shuffleResponses = (responses: ResponseProps[]) => {
  const shuffledResponses = [...responses].sort(() => Math.random() - 0.5);
  return shuffledResponses;
}

export const shufflePromptsAndResponses = (promptsAndResponses: PromptResponseProps) => {
  return {
    prompts: shufflePrompts(promptsAndResponses.prompts),
    responses: shuffleResponses(promptsAndResponses.responses)
  }
}

export const getTemperatureResponses = () => {
  return temperatureResponses;
}

export default getPromptsResponses;

