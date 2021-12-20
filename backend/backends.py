# from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import update_last_login
from django.contrib.auth import get_user_model

User = get_user_model()

class EmailAuthBackend(object):
	"""
	Email Authentication Backend

	Allows a user to sign in using an email/password pair rather than
	a username/password pair.
	"""

	def authenticate(self, request, **kwargs):
		if 'username' in kwargs:
			username = kwargs['username']
		else:
			username = kwargs['email']
		password = kwargs['password']

		try:
			user = User.objects.get(email=username)
			if user.check_password(password) or user.user_social_id == password:
				# user.last_login_time = timezone.now()
				# user.save(update_fields=['last_login_time'])
				return user
		except User.DoesNotExist:
			return None
 
	def get_user(self, user_id):
		""" Get a User object from the user_id. """
		try:
			return User.objects.get(pk=user_id)
		except User.DoesNotExist:
			return None