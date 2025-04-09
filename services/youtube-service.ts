export interface YouTubeSearchResult {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
}

// Get API key from environment variable with fallback
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';

class YouTubeService {
  async searchVideos(query: string): Promise<YouTubeSearchResult[]> {
    try {
      if (!query.trim()) return [];
      if (!API_KEY) {
        console.error('YouTube API key is not configured');
        return [];
      }
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
          query
        )}&type=video&key=${API_KEY}`
      );

      const data = await response.json();
      
      if (!data.items) {
        console.error('YouTube API error:', data);
        return [];
      }

      return data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
        channelTitle: item.snippet.channelTitle
      }));
    } catch (error) {
      console.error('Error searching YouTube:', error);
      return [];
    }
  }

  getVideoUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  
  getEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
  }
}

export default new YouTubeService();
