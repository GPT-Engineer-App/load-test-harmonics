import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Paw, Heart, Star } from "lucide-react";

const CatBreed = ({ name, description, image }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Paw className="w-5 h-5 mr-2 text-purple-500" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-110" />
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const Index = () => {
  const [email, setEmail] = useState("");
  const [activeBreed, setActiveBreed] = useState(0);
  const { toast } = useToast();

  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
    { name: "Maine Coon", description: "One of the largest domestic cat breeds, known for their intelligence and playful personality.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
    { name: "Persian", description: "Recognized for their long fur and flat faces.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
    { name: "Bengal", description: "Known for their wild appearance and energetic personality.", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
    { name: "Sphynx", description: "Distinctive for their lack of fur and wrinkled skin.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBreed((prev) => (prev + 1) % catBreeds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: `You've been added to our newsletter with email: ${email}`,
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="relative h-[60vh] bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold text-white mb-4">Discover the World of Cats</h1>
            <p className="text-xl text-gray-200">Explore, Learn, and Fall in Love with Felines</p>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex justify-center pb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-100"
            onClick={() => document.getElementById('content').scrollIntoView({ behavior: 'smooth' })}
          >
            Explore More
          </Button>
        </motion.div>
      </div>

      <div id="content" className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Tabs defaultValue="about" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About Cats</TabsTrigger>
              <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
              <TabsTrigger value="care">Cat Care</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-6 h-6 mr-2 text-red-500" />
                    About Cats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-700">
                    Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
                    independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
                    characteristics and personalities.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <Carousel className="w-full max-w-md mx-auto">
                <CarouselContent>
                  {catBreeds.map((breed, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <CatBreed {...breed} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </TabsContent>
            <TabsContent value="care">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-6 h-6 mr-2 text-yellow-500" />
                    Cat Care Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-none pl-5 space-y-2">
                    {[
                      "Provide a balanced diet",
                      "Regular veterinary check-ups",
                      "Keep the litter box clean",
                      "Offer mental and physical stimulation",
                      "Groom your cat regularly"
                    ].map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <Paw className="w-4 h-4 mr-2 text-purple-500" />
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Accordion type="single" collapsible className="mb-12">
            <AccordionItem value="item-1">
              <AccordionTrigger>Fun Cat Facts</AccordionTrigger>
              <AccordionContent>
                <ul className="list-none pl-5 space-y-2">
                  {[
                    "Cats sleep for about 70% of their lives",
                    "A group of cats is called a \"clowder\"",
                    "Cats have over 20 vocalizations, including the purr",
                    "A cat's sense of smell is 14 times stronger than a human's"
                  ].map((fact, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <Paw className="w-4 h-4 mr-2 text-purple-500" />
                      {fact}
                    </motion.li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                Subscribe to Our Cat Newsletter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow"
                />
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Subscribe</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <footer className="bg-purple-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2023 Cat Lovers United. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="hover:text-purple-300">Privacy Policy</a>
            <a href="#" className="hover:text-purple-300">Terms of Service</a>
            <a href="#" className="hover:text-purple-300">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
