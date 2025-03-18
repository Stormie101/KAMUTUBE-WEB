using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KAMUTUBE_WEB.Controllers
{
    public class YouTubeController : Controller
    {
        private readonly YouTubeService _youtubeService;

        public YouTubeController(YouTubeService youtubeService)
        {
            _youtubeService = youtubeService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Search(string query)
        {
            var videos = await _youtubeService.SearchVideosAsync(query);
            return View("Index", videos);
        }
    }
}
