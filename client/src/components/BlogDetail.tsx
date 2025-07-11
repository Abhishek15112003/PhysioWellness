import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User } from "lucide-react";
import type { BlogPost } from "@shared/schema";

interface BlogDetailProps {
  blogId: number;
  onBack: () => void;
}

export default function BlogDetail({ blogId }: BlogDetailProps) {
  const [, setLocation] = useLocation();
  
  const { data: blogPost, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog-posts/${blogId}`],
  });

  if (isLoading) {
    return (
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(217,91%,60%)] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article not found</h1>
          <Button onClick={() => setLocation('/')} className="bg-[hsl(217,91%,60%)] text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Exercise Tips":
        return "bg-[hsl(217,91%,60%)]";
      case "Ergonomics":
        return "bg-[hsl(142,76%,36%)]";
      case "Sports Medicine":
        return "bg-[hsl(38,92%,50%)]";
      default:
        return "bg-gray-600";
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric"
    });
  };

  const getExpandedContent = (content: string, title: string) => {
    // Generate more detailed content based on the title
    switch (title) {
      case "5 Essential Exercises for Lower Back Pain Relief":
        return `
Lower back pain is one of the most common complaints we see at PhysioWell. Here are 5 exercises that can help strengthen your core and alleviate pain:

## 1. Cat-Cow Stretch
Start on your hands and knees. Arch your back and look up (cow), then round your spine and tuck your chin (cat). Repeat 10-15 times.

## 2. Bird Dog Exercise  
From hands and knees, extend opposite arm and leg. Hold for 5 seconds, then switch sides. This builds core stability.

## 3. Dead Bug
Lie on your back with knees bent at 90 degrees. Slowly lower opposite arm and leg, keeping your back flat. Return to start and repeat.

## 4. Glute Bridge
Lie on your back, knees bent. Squeeze your glutes and lift your hips up. Hold for 2 seconds, then lower. Repeat 15-20 times.

## 5. Modified Plank
Start in a plank position on your knees instead of toes. Hold for 30 seconds, building up to 1 minute.

Remember to start slowly and listen to your body. If any exercise causes pain, stop immediately and consult with our physiotherapy team.
        `;
      case "Creating an Ergonomic Workspace for Better Posture":
        return `
With more people working from home, proper ergonomics has become crucial for preventing musculoskeletal issues. Here's how to set up your workspace:

## Monitor Position
Your screen should be at arm's length (about 20-26 inches away) with the top of the screen at or slightly below eye level. This prevents neck strain.

## Chair Setup
Choose a chair with good lumbar support. Your feet should be flat on the floor with knees at about 90 degrees. Use a footrest if needed.

## Keyboard and Mouse
Keep your wrists straight while typing. Your elbows should be at about 90 degrees with shoulders relaxed.

## Lighting
Position your screen perpendicular to windows to avoid glare. Use a desk lamp for reading materials.

## Take Breaks
Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds. Stand and stretch every hour.

## Common Mistakes to Avoid
- Working from bed or couch regularly
- Screen too high or low
- Reaching for the mouse
- Poor lighting causing you to lean forward

Investing in proper ergonomics now can prevent years of pain and injury later.
        `;
      case "Preventing Sports Injuries: Pre-Exercise Preparation":
        return `
Sports injuries can be devastating, but many are preventable with proper preparation and warm-up techniques:

## Dynamic Warm-Up (5-10 minutes)
Start with light cardio like jogging in place, then move to dynamic stretches:
- Leg swings (forward/back and side to side)
- Arm circles
- Hip circles
- High knees and butt kicks

## Sport-Specific Movements
Practice movements you'll use in your sport at a slower pace:
- Basketball players: shooting motions
- Runners: gradual pace increases
- Tennis players: practice swings

## Strength Training
Build a foundation with these key exercises:
- Squats for leg strength
- Core exercises for stability
- Shoulder strengthening for overhead athletes

## Flexibility and Mobility
Maintain good range of motion with:
- Regular stretching routines
- Foam rolling
- Joint mobility exercises

## Listen to Your Body
Warning signs to watch for:
- Persistent pain or discomfort
- Unusual fatigue
- Previous injury sites feeling "off"

## Recovery is Part of Training
- Get adequate sleep (7-9 hours)
- Stay hydrated
- Allow rest days between intense sessions
- Consider massage or physiotherapy for maintenance

Remember: An ounce of prevention is worth a pound of cure!
        `;
      default:
        return content;
    }
  };

  const formatContent = (content: string) => {
    // Convert markdown-style headings and formatting to JSX
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentKey = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('## ')) {
        // H2 heading
        elements.push(
          <h2 key={currentKey++} className="text-2xl font-bold text-gray-800 mt-8 mb-4">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('# ')) {
        // H1 heading
        elements.push(
          <h1 key={currentKey++} className="text-3xl font-bold text-gray-800 mt-8 mb-4">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('- ')) {
        // List item - collect all consecutive list items
        const listItems: string[] = [];
        let j = i;
        while (j < lines.length && lines[j].trim().startsWith('- ')) {
          listItems.push(lines[j].trim().replace('- ', ''));
          j++;
        }
        elements.push(
          <ul key={currentKey++} className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            {listItems.map((item, index) => (
              <li key={index} className="ml-4">{item}</li>
            ))}
          </ul>
        );
        i = j - 1; // Skip the processed list items
      } else if (line === '') {
        // Empty line - add spacing
        elements.push(<div key={currentKey++} className="mb-4"></div>);
      } else if (line.length > 0) {
        // Regular paragraph
        elements.push(
          <p key={currentKey++} className="text-gray-700 mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            onClick={() => setLocation('/')}
            className="mb-8 text-[hsl(217,91%,60%)] hover:text-[hsl(217,91%,55%)] bg-transparent border-none shadow-none hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>

          {/* Article Header */}
          <div className="mb-8">
            <img 
              src={blogPost.imageUrl} 
              alt={blogPost.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
            />
            
            <div className="flex items-center gap-4 mb-6">
              <Badge className={`${getCategoryColor(blogPost.category)} text-white`}>
                {blogPost.category}
              </Badge>
              <div className="flex items-center text-gray-500">
                <Calendar className="mr-2 h-4 w-4" />
                {formatDate(blogPost.publishedAt!)}
              </div>
              <div className="flex items-center text-gray-500">
                <User className="mr-2 h-4 w-4" />
                PhysioWell Team
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {blogPost.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {blogPost.excerpt}
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed">
              {formatContent(getExpandedContent(blogPost.content, blogPost.title))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 p-8 bg-[hsl(210,20%,98%)] rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Need Professional Help?</h3>
            <p className="text-gray-600 mb-6">
              Our experienced physiotherapists are here to help you achieve optimal health and wellness.
            </p>
            <Button 
              onClick={() => {
                const bookingSection = document.getElementById('booking');
                if (bookingSection) {
                  setLocation('/');
                  setTimeout(() => {
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="bg-[hsl(217,91%,60%)] text-white px-8 py-3 text-lg font-semibold hover:bg-[hsl(217,91%,55%)] transition-colors"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
