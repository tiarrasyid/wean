import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Initialize Flask App ---
app = Flask(__name__)
# Allow requests from your Next.js app (http://localhost:3000)
allowed_origins = ["http://localhost:3000"]
CORS(app, resources={r"/analyze": {"origins": allowed_origins}})

def analyze_html(soup):
    """The core analysis logic, returning a structured list."""
    findings = []

    # 1. Title check
    if not soup.find('title') or not soup.find('title').string.strip():
        findings.append({"type": "error", "message": "The `<title>` tag is missing or empty. A descriptive title is crucial for SEO."})

    # 2. Meta description check
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    if not meta_desc or not meta_desc.get('content', '').strip():
        findings.append({"type": "error", "message": "A meta description is missing, which is important for search engine snippets."})

    # 3. Image alt attributes
    imgs_without_alt = [img for img in soup.find_all('img') if not img.get('alt', '').strip()]
    if imgs_without_alt:
        findings.append({"type": "error", "message": f"Found {len(imgs_without_alt)} `<img>` tags without descriptive `alt` text. This harms accessibility."})

    # 4. Inline styles
    elements_with_inline_styles = soup.find_all(style=True)
    if elements_with_inline_styles:
        findings.append({"type": "warning", "message": f"Found {len(elements_with_inline_styles)} elements using inline `style` attributes. Prefer external CSS."})

    # 5. Heading structure
    headings = [int(h.name[1]) for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])]
    if len(headings) > 1:
        for i in range(len(headings) - 1):
            if headings[i+1] > headings[i] + 1:
                findings.append({"type": "warning", "message": f"Improper heading structure: A `<h{headings[i+1]}>` was found after a `<h{headings[i]}>`. Levels should not be skipped."})
                break
                
    # 6. Missing <h1>
    if not soup.find('h1'):
        findings.append({"type": "error", "message": "The page does not have an `<h1>` tag. Each page should have one main heading."})
        
    return findings


@app.route("/analyze", methods=["POST"])
def analyze_endpoint():
    """API endpoint that receives a URL and returns the analysis."""
    data = request.get_json()
    if not data or "url" not in data:
        return jsonify({"error": "URL is required"}), 400

    url = data["url"]
    
    try:
        parsed_url = urlparse(url)
        if not parsed_url.scheme:
            url = "https://" + url
        
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=10)
        response.raise_for_status()
        
    except requests.RequestException as e:
        return jsonify({"error": f"Failed to fetch the URL: {e}"}), 500

    soup = BeautifulSoup(response.content, 'html.parser')
    analysis_results = analyze_html(soup)

    return jsonify({
        "url": url,
        "findings": analysis_results
    })

# --- Main Execution ---
if __name__ == "__main__":
    # Runs the app on port 5000
    app.run(debug=True, port=5000)