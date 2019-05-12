from pony.orm import *
from datetime import datetime, date, time
from persistance.persistance import db


class Student(db.Entity):
    """Students Entity"""

    # Define o nome da tabela
    _table_ = "students"

    ID = PrimaryKey(int, auto=True)  # o ID será gerado automaticamente
    name = Required(str)
    address = Required(str)
    birth_date = Required(date)
    lessons = Set('Lesson')


class Instructor(db.Entity):
    """Instructors Entity"""

    # Define nome da tabela
    _table_ = "instructors"

    ID = PrimaryKey(int, auto=True)  # o ID será gerado automaticamente
    name = Required(str)
    license_number = Required(int)  # número do brevê
    address = Required(str)
    birth_date = Required(date)
    course_name = Required(str)
    graduation_date = Required(date)  # data de obtenção do diploma. Depois temos que ver como faz para se usar date ao invés de string
    institution = Required(str)
    lessons = Set('Lesson')


class Lesson(db.Entity):
    """Lesson entity"""

    # Define o nome da tabela
    _table_ = "lessons"

    ID = PrimaryKey(int, auto=True)
    day = Required(date)
    expected_start = Required(datetime)
    expected_duration = Required(datetime)
    actual_duration = Optional(datetime)
    status = Required(int)
    student = Required(Student)
    instructor = Required(Instructor)
