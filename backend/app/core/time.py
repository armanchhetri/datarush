from datetime import datetime, tzinfo, timedelta
TIME_OFFSET = 5.75

class Zone(tzinfo):
    def __init__(self, offset, isdst, name):
        self.offset = offset
        self.isdst = isdst
        self.name = name

    def utcoffset(self, dt):
        return timedelta(hours=self.offset) + self.dst(dt)

    def dst(self, dt):
        return timedelta(hours=1) if self.isdst else timedelta(0)

    def tzname(self, dt):
        return self.name


def now():
    return datetime.utcnow() + timedelta(hours=TIME_OFFSET)

def today():
    return now().date()

def this_year():
    return today().year
