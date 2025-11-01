from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/book', methods=['POST'])
def book():
    data = request.json
    name = data.get('name')
    number = data.get('number')
    offer = data.get('offer')
    
    print(f"New booking: {name}, {number}, {offer}")
    
    return jsonify({'status': 'success', 'message': 'Booking submitted!'})

if __name__ == '__main__':
    app.run(debug=True)