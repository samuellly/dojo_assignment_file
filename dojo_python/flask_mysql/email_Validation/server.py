from flask import Flask, request, redirect, render_template, flash
from mysqlconnection import MySQLConnector
import re

app = Flask(__name__)
app.secret_key = "Shhhhh, it's a secret!"

mysql = MySQLConnector(app, "emaildb")

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/addaddy', methods=['POST'])
def addaddy():
	query = "SELECT * FROM email WHERE email = :email;"
	data = {
		'email' : request.form['email']
	}

	user = mysql.query_db(query, data)

	if not EMAIL_REGEX.match(request.form['email']):
		flash('Please enter a valid e-mail address')
	elif user:
		flash('E-mail already registered')
	else:
		query = "INSERT INTO email (email, created_at, updated_at) VALUES (:email, NOW(), NOW());"
		mysql.query_db(query, data)
		return redirect('/emails')

	return redirect('/')

@app.route('/emails')
def emails():
	query = "SELECT * FROM emails ORDER BY emails.id DESC;"
	addies = mysql.query_db(query)
	return render_template('emails.html', addies = addies)

@app.route('/delete/<id>')
def delete(id):
	query = "DELETE FROM emails WHERE emails.id = :id"
	data = {
		'id' : id
	}
	mysql.query_db(query, data)
	return redirect('/emails')

app.run(debug=True)
