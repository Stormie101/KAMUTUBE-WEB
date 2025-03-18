using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

public class YouTubeService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey = "AIzaSyBbICsWH80qfuPdXsCAPS3j3OW333-cyKk"; // Replace this

    public YouTubeService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<JArray> SearchVideosAsync(string query)
    {
        string url = $"https://www.googleapis.com/youtube/v3/search?part=snippet&q={query}&type=video&key={_apiKey}";
        var response = await _httpClient.GetStringAsync(url);
        var jsonData = JObject.Parse(response);
        return (JArray)jsonData["items"];
    }
}
