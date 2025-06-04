
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Play, Scissors, Sparkles, Youtube } from "lucide-react";

const Index = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!youtubeUrl.trim()) {
      toast({
        title: "Missing URL",
        description: "Please enter a YouTube video URL",
        variant: "destructive",
      });
      return;
    }

    if (!isValidYouTubeUrl(youtubeUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    if (!instructions.trim()) {
      toast({
        title: "Missing Instructions",
        description: "Please provide clipping instructions",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call (this would connect to Flask backend)
    console.log("YouTube URL:", youtubeUrl);
    console.log("User Instructions:", instructions);
    
    try {
      // This would be replaced with actual Flask API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Processing Started!",
        description: "Your video is being clipped. This may take a few minutes.",
      });
      
      // Reset form
      setYoutubeUrl("");
      setInstructions("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Youtube className="h-12 w-12 text-red-500" />
              <Scissors className="h-6 w-6 text-purple-400 absolute -top-1 -right-1" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            YouTube Video Clipper
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Transform long videos into focused clips with AI-powered content extraction. 
            Perfect for lectures, tutorials, and educational content.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                Clip Your Video
              </CardTitle>
              <CardDescription className="text-slate-400">
                Enter a YouTube URL and describe what content you want to extract
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="youtube-url" className="text-white">
                    YouTube Video URL
                  </Label>
                  <Input
                    id="youtube-url"
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions" className="text-white">
                    Clipping Instructions
                  </Label>
                  <Textarea
                    id="instructions"
                    placeholder="Example: Extract only the parts about drag force and air resistance from this physics lecture..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={4}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Video...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      Clip Video
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-slate-800/30 backdrop-blur border-slate-700">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">AI-Powered</h3>
                <p className="text-slate-400 text-sm">
                  Advanced AI analyzes content to find exactly what you need
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 backdrop-blur border-slate-700">
              <CardContent className="p-6 text-center">
                <Scissors className="h-8 w-8 text-pink-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Precise Clipping</h3>
                <p className="text-slate-400 text-sm">
                  Extract specific topics or segments with surgical precision
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 backdrop-blur border-slate-700">
              <CardContent className="p-6 text-center">
                <Play className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Fast Processing</h3>
                <p className="text-slate-400 text-sm">
                  Get your clipped videos quickly and efficiently
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
