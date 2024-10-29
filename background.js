browser.webRequest.onBeforeRequest.addListener(
    function(details) {
      const url = details.url;
      const mnPatterns = ['mn://', 'mn%3A%2F%2F', 'mn%3a%2f%2f', 'vn://', 'vn%3A%2F%2F', 'vn%3a%2f%2f'];
      
      for (let pattern of mnPatterns) {
        let index = url.indexOf(pattern);
        if (index !== -1) {
          let startIndex = index + pattern.length;
          let domain = url.substring(startIndex).replace(/\/$/, '');
          
          domain = domain.split('?')[0].split('#')[0].split('&')[0];
          
          domain = decodeURIComponent(domain);
          
          return {
            redirectUrl: `https://${domain}.vnic.tech`
          };
        }
      }
    },
    {
      urls: [
        "<all_urls>",
        "*://*/*mn://*",
        "*://*/*mn%3A%2F%2F*",
        "*://*/*mn%3a%2f%2f*",
        "*://*/*vn://*",
        "*://*/*vn%3A%2F%2F*",
        "*://*/*vn%3a%2f%2f*"
      ],
      types: ["main_frame"]
    },
    ["blocking"]
  );