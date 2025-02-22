from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email=request.form.get('email')
        password=request.form.get('password')
        
        user=User.query.filter_by(email=email).first()
        
        if user:
            if check_password_hash(user.password,password):
                flash('Logged in succesfully', category='success')
                login_user(user, remember=True)
                if user.role == 'customer':                
                    return redirect(url_for('views.home'))
                elif user.role == 'employee':                
                    return redirect(url_for('views.admin_home'))
            else:
                flash('Incorrect password, please try again', category='error')
        else:
            flash('Email does not exist', category='error')
         
    return render_template("login.html", user=current_user)    
        
                


@auth.route('/logout')
@login_required
def logout():
    if current_user.is_authenticated:
        logout_user()
    return redirect(url_for('auth.login'))


@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        
        user=User.query.filter_by(email=email).first()
        
        if user:
            flash('This email already exists', category='error')
        elif len(email) < 4:
            flash('Email must contain at least 4 characters', category='error') 
        elif len(first_name) < 2:
            flash('First Name must contain at least 2 characters', category='error')  
        elif password1 != password2:
            flash('Passwords do not match!', category='error')
        elif len(password1) < 7:
            flash('Password must contain at least 7 characters', category='error')  
        else:
            new_user=User(email=email, first_name=first_name, password=generate_password_hash(password1, method='pbkdf2:sha256'))
            db.session.add(new_user)
            db.session.commit()
            
           
            flash('Account created successfully', category='success')
        
            return redirect(url_for('views.home'))
            # add user to db
            
    
    return render_template("sign_up.html", user=current_user) 
