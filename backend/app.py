from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime


app=Flask(__name__)
CORS(app)

DB_File="task.db"


def init_db():
	if os.path.exists(DB_File):
		os.remove(DB_File) 
	con=sqlite3.connect(DB_File)
	c=con.cursor()
	c.execute('''CREATE TABLE tasks(id integer primary key autoincrement,title text not null,status text default 'Pending',priority text default 'Medium',created_date text,updated_date text)''')
	con.commit()
	con.close()
init_db()

#View Task
@app.route('/tasks',methods=['GET'])
def get_task():
	con=None
	try:
		con=sqlite3.connect(DB_File)
		cursor=con.cursor()
		sql="select * from tasks"
		cursor.execute(sql)
		data=cursor.fetchall()
		tasks=[]
		for d in data:
			tasks.append({
				'id':d[0],
				'title':d[1],
				'status':d[2],	
				'priority':d[3],	
				'created_date':d[4],	
				'updated_date':d[5]	
			})
		
		return jsonify(tasks), 200

	except Exception as e:
		return jsonify({'error':str(e)}), 500
	finally:
		if con is not None:
			con.close()

#Add Task
@app.route('/tasks',methods=['POST'])
def add_task():
	data=request.get_json()
	title=data.get('title')
	status=data.get('status','Pending')
	priority=data.get('priority','Medium')
	created_date = updated_date= datetime.now().strftime("%Y-%m-%d %H:%M:%S")

	if not title:
		return jsonify({'error':'Title is Required'}), 400

	con=None
	try:
		con=sqlite3.connect(DB_File)
		cursor=con.cursor()
		sql="INSERT INTO tasks (title,status,priority,created_date,updated_date) VALUES (?, ?, ?, ?,?)"
		cursor.execute(sql, (title,status,priority,created_date,updated_date))
		con.commit()
		return jsonify({'message':'Task Added Successfully'}), 201

	except Exception as e:
		return jsonify({'error':str(e)}), 500
	finally:
		if con is not None:
			con.close()

#Update Task
@app.route('/tasks/<int:id>',methods=['PUT'])
def update_task(id):
	data=request.get_json()
	new_title=data.get('title')
	status=data.get('status','Pending')
	priority=data.get('priority','Medium')
	updated_date= datetime.now().strftime("%Y-%m-%d %H:%M:%S")

	if not new_title:
		return jsonify({'error':'Title is Required'}), 400

	con=None
	try:
		con=sqlite3.connect(DB_File)
		cursor=con.cursor()
		cursor.execute("select * from tasks where id=?",(id,))
		existing=cursor.fetchone()
	
		if not existing:
			return jsonify({'error':'Task not found'}), 404

		sql="update tasks set title=?,status=?,priority=?,updated_date=? where id=?"
		cursor.execute(sql,(new_title,status,priority,updated_date,id))
		con.commit()
		return jsonify({'message':'Task Updated Successfully'}), 200

	except Exception as e:
		return jsonify({'error':str(e)}), 500
	finally:
		if con is not None:
			con.close()

#Delete task
@app.route('/tasks/<int:id>',methods=['DELETE'])
def delete_task(id):
	con=None
	try:
		con=sqlite3.connect(DB_File)
		cursor=con.cursor()
		cursor.execute("select * from tasks where id=?",(id,))
		existing=cursor.fetchone()
	
		if not existing:
			return jsonify({'error':'Task not found'}), 404

		sql="delete from tasks where id=?"
		cursor.execute(sql,(id,))
		con.commit()
		return jsonify({'message':'Task Deleted Successfully'}), 200

	except Exception as e:
		return jsonify({'error':str(e)}), 500
	finally:
		if con is not None:
			con.close()


#Testing for Backend API is Running Properly
@app.route('/')
def home():
	return jsonify({'message':'Task Manager API is Running Successfully'}), 200




if __name__=='__main__':
	app.run(debug=True)