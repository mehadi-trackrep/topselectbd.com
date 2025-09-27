import { Link } from "wouter";
import { Heart, Users, Award, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="text-primary">আচারে পাকা</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey of taste, tradition, and family recipes passed down through generations
          </p>
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Started with a simple idea - to bring the authentic taste of home-made pickles to your table. 
              Our pickles are made with love, using traditional recipes that have been passed down through generations.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Every pickle in our collection is prepared with the finest ingredients and time-honored techniques 
              that ensure every bite is a burst of flavor and nostalgia.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <Heart className="text-primary mr-2" />
                <span>Handcrafted with Love</span>
              </div>
              <div className="flex items-center">
                <Award className="text-primary mr-2" />
                <span>Quality Ingredients</span>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <img 
              src="/placeholder-image.jpg" 
              alt="Traditional pickle making process" 
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
              <p className="text-muted-foreground">
                Recipes created with traditional methods and genuine passion
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-muted-foreground">
                Only the finest ingredients sourced for our pickles
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tradition</h3>
              <p className="text-muted-foreground">
                Preserving family recipes from generation to generation
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Family</h3>
              <p className="text-muted-foreground">
                Made with the same care as our grandmother's recipes
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="/placeholder-image.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Nusrat Jahan</h3>
              <p className="text-muted-foreground mb-2">Founder & Master Chef</p>
              <p className="text-sm text-muted-foreground">
                Brings 20+ years of traditional pickle-making experience
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="/placeholder-image.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Rafiqul Islam</h3>
              <p className="text-muted-foreground mb-2">Quality Assurance</p>
              <p className="text-sm text-muted-foreground">
                Ensures every batch meets our high standards
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="/placeholder-image.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Sadia Afrin</h3>
              <p className="text-muted-foreground mb-2">Business Development</p>
              <p className="text-sm text-muted-foreground">
                Manages customer relations and growth
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The best pickles I've ever tasted! Reminds me of my childhood and my mother's kitchen."
              </p>
              <p className="font-medium">- Rahman Mia</p>
            </div>
            <div className="bg-card p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Authentic taste with premium quality. Always my go-to for special occasions."
              </p>
              <p className="font-medium">- Fatima Akter</p>
            </div>
            <div className="bg-card p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The packaging is excellent and the pickle tastes as fresh as homemade. Highly recommended!"
              </p>
              <p className="font-medium">- Ahmed Hassan</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Join Our Family of Food Lovers</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover the authentic taste of traditional Bengali pickles made with love and care
          </p>
          <Link href="/shop">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold">
              Shop Our Collection
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}