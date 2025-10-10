using System.Net.Http.Json;

namespace backend.Services
{
    public class AIService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public AIService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<string> SummarizeTextAsync(string input)
        {
            var apiKey = _config["OpenAI:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
                throw new Exception("OpenAI API key not configured");

            var request = new
            {
                model = "gpt-4-turbo",
                messages = new[]
                {
                    new { role = "system", content = "You are an educational assistant that summarizes school content clearly and concisely." },
                    new { role = "user", content = input }
                }
            };

            using var req = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");
            req.Headers.Add("Authorization", $"Bearer {apiKey}");
            req.Content = JsonContent.Create(request);

            var res = await _httpClient.SendAsync(req);
            res.EnsureSuccessStatusCode();

            var json = await res.Content.ReadFromJsonAsync<dynamic>();
            return json?.choices?[0]?.message?.content ?? "No summary generated.";
        }
    }
}
