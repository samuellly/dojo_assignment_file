from flask import Flask, render_template

app=Flask(__name__)

@app.route('/')

def serveIndex():
    return render_template('index.html')

@app.route('/ninjas')

def ninjaInfo():
    return render_template('ninjas.html')

@app.route('/dojos/new')

def createDojo():
    return render_template('dojo.html')

app.run(debug=True)
