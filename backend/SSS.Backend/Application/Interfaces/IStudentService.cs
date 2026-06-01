using SSS.Backend.Application.DTOs;

namespace SSS.Backend.Application.Interfaces;

public interface IStudentService
{
    Task<IEnumerable<StudentDTO>> GetStudents();
    Task<StudentDTO> GetStudent(Guid id);
}