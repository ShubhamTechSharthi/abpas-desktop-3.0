import logging
import os
import inspect

current_path = os.getcwd()

log_file = os.path.join(current_path,"scrutiny_error.log")

logging.basicConfig(
    filename=log_file, 
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s [Line: %(lineno)d]'
)

def log_error(message):
    line_number = inspect.currentframe().f_back.f_lineno
    logging.error(f"{message} [Line: {line_number}]")

def log_info(message):
    logging.info(message)