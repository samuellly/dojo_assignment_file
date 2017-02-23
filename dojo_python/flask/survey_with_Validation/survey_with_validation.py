from flask import Flask, render_template, request, redirect,session,flash
app = Flask(__name__)

app.secret_key= 'lol'

@app.route('/')

def index():
    return render_template('index.html')



@app.route('/result', methods=['POST'])

def result():
    if len(request.form['name'])<1 or len(request.form['comment'])<1:# display validation errors
        flash('please pill the info in empty box')# just pass a string to the flash function
        return redirect('/')
    elif len(request.form['comment'])>120:
        flash('comment too long, leave the comment less than 120 characters')# display success message
        return redirect('/')
    else:
        return render_template('result.html', name = request.form['name'], location = request.form['location'], language = request.form['language'], comment = request.form['comment'])

app.run(debug=True)
