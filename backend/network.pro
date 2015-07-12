#-------------------------------------------------
#
# Project created by QtCreator 2011-10-28T11:20:51
#
#-------------------------------------------------

QT       += core gui network

TARGET = network
TEMPLATE = app

QT_SRCS += ../common/scpi-def.c
QMAKE_CFLAGS += -Wextra -Wmissing-prototypes -Wimplicit -I ../libscpi/inc/
QMAKE_LFLAGS += ../libscpi/dist/libscpi.a -Wl,--as-needed


SOURCES += main.cpp\
        mainwindow.cpp

HEADERS  += mainwindow.h

FORMS    += mainwindow.ui
