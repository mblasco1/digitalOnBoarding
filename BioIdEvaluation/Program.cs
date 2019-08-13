using DigitalOnboarding.Models;
using DigitalOnboarding.Services;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace BioIdEvaluation
{
    class Program
    {
        static void Main(string[] args)
        {
            var path = @"C:\Users\mar\Documents\onboarding\bioidImages";
            var client = new BioIdClient(new HttpClient());
            var dir = new DirectoryInfo(path);
            Console.WriteLine("genuine attempts:");
            int[] genuineResults = new int[6];
            int[] fakeResults = new int[6];
            dir.EnumerateDirectories()
                .Select(async subdir =>
                {
                    var id = ReadFileAsync(subdir.FullName + @"\id.png");
                    var liveimage1 = ReadFileAsync(subdir.FullName + @"\1.png");
                    var liveimage2 = ReadFileAsync(subdir.FullName + @"\2.png");

                    var images = await Task.WhenAll(id, liveimage1, liveimage2);

                    for (int accuracy = 5; accuracy >= 1; accuracy--)
                    {
                        var imgs = new PhotoVerifyImages()
                        {
                            accuracy = accuracy,
                            idphoto = images[0],
                            liveimage1 = images[1],
                            liveimage2 = images[2]
                        };
                        (Result result, int statusCode, string response) = await client.PhotoVerifyAsync(imgs);

                        if (result == null)
                        {
                            genuineResults[0]++;
                            Console.WriteLine($"error for {subdir.Name}: {statusCode}: {response}");
                            return;
                        }
                        else if (result.IsValid)
                        {
                            genuineResults[accuracy]++;
                            Console.WriteLine($"{subdir.Name} passed with accuracy {accuracy}");
                            return;
                        }
                    }
                    genuineResults[0]++;
                    Console.WriteLine($"{subdir.Name}: face and id don't match");
                }).ToList().ForEach(e => e.Wait());

            Console.WriteLine("\nfake attempts:");
            dir.EnumerateDirectories()
               .SelectMany(faceDir =>
               {
                   Thread.Sleep(5000); // give bws some room to breathe
                   return dir.EnumerateDirectories()
                      .Select(async idDir =>
                      {
                          if (idDir.Name.Equals(faceDir.Name))
                          {
                              return;
                          }
                          var id = ReadFileAsync(idDir.FullName + @"\id.png");
                          var liveimage1 = ReadFileAsync(faceDir.FullName + @"\1.png");
                          var liveimage2 = ReadFileAsync(faceDir.FullName + @"\2.png");

                          var images = await Task.WhenAll(id, liveimage1, liveimage2);

                          for (int accuracy = 1; accuracy <= 5; accuracy++)
                          {
                              var imgs = new PhotoVerifyImages()
                              {
                                  accuracy = accuracy,
                                  idphoto = images[0],
                                  liveimage1 = images[1],
                                  liveimage2 = images[2]
                              };
                              (Result result, int statusCode, string response) = await client.PhotoVerifyAsync(imgs);

                              if (result == null)
                              {
                                  fakeResults[0]++;
                                  Console.WriteLine($"error for {faceDir.Name}: {statusCode}: {response}");
                                  return;
                              }
                              else if (!result.IsValid && accuracy == 1)
                              {
                                  fakeResults[0]++;
                                  Console.WriteLine($"{faceDir.Name}'s face and {idDir.Name}'s id don't match");
                                  return;
                              }
                              else if(!result.IsValid)
                              {
                                  fakeResults[accuracy - 1]++;
                                  Console.WriteLine($"{faceDir.Name} passed with {idDir.Name}'s id with accuracy {accuracy-1}");
                                  return;
                              }
                              else if (result.IsValid && accuracy == 5)
                              {
                                  fakeResults[accuracy]++;
                                  Console.WriteLine($"{faceDir.Name} passed with {idDir.Name}'s id with accuracy {accuracy}");
                                  return;
                              }
                          }
                  });
               }).ToList().ForEach(e => e.Wait());

            Console.WriteLine($"\nTotal genuine attempts: {genuineResults.Sum()}");
            Console.WriteLine($"Failed: {genuineResults[0]}");
            Console.WriteLine($"Accuracy 1: {genuineResults[1]}");
            Console.WriteLine($"Accuracy 2: {genuineResults[2]}");
            Console.WriteLine($"Accuracy 3: {genuineResults[3]}");
            Console.WriteLine($"Accuracy 4: {genuineResults[4]}");
            Console.WriteLine($"Accuracy 5: {genuineResults[5]}");


            Console.WriteLine($"\nTotal fake attempts: {fakeResults.Sum()}");
            Console.WriteLine($"Failed: {fakeResults[0]}");
            Console.WriteLine($"Accuracy 1: {fakeResults[1]}");
            Console.WriteLine($"Accuracy 2: {fakeResults[2]}");
            Console.WriteLine($"Accuracy 3: {fakeResults[3]}");
            Console.WriteLine($"Accuracy 4: {fakeResults[4]}");
            Console.WriteLine($"Accuracy 5: {fakeResults[5]}");
        }

        private static Task<string> ReadFileAsync(string path)
        {
            return File.ReadAllBytesAsync(path)
                .ContinueWith(async data => "data:image/png;base64," + Convert.ToBase64String(await data))
                .Unwrap();
        }
    }
}
