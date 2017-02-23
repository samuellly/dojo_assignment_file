from flask import Flask, render_template, request, redirect,session
app = Flask(__name__)
app.secret_key ="lol"

@app.route('/')

def counter():

    try:
        session['counter']+=1
    except KeyError:
        session['counter']=0
    return render_template('index.html')
@app.route('/a')

def plus2():
        session['counter']+=1
        return redirect('/')
@app.route('/b')
def reset():
    session.clear()
    return redirect('/')
app.run(debug=True)
