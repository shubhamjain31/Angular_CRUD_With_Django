from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import update_last_login

class EmailAuthBackend(object):
	"""
	Email Authentication Backend

	Allows a user to sign in using an email/password pair rather than
	a username/password pair.
	"""
 
	def authenticate(self, username=None, password=None):
		""" Authenticate a user based on email address as the user name. """
		try:
			user = User.objects.get(email=username)
			if user.check_password(password):
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